import Meta from '@/layouts/Meta';
import Main from '@/templates/Main';
import { APIMonster } from '@/types/monster';
import { capitalize, getBaseUrl } from '@/utils/helpers';
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { AppConfig } from '@/utils/AppConfig';


// Not being used anywhere else atm, so just leaving here
interface SearchSelectProps {
	fieldName: string; 
	fieldOptions: string[]; 
	register: UseFormRegister<FieldValues>;
	handleFieldChange: () => void
}
const SearchSelect = ({fieldName, fieldOptions, register, handleFieldChange}: SearchSelectProps) => {
	return (
		<>
			<label htmlFor="type" className="sr-only">Select by {fieldName}</label>
			<select 
				id="type" 
				className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				{...register(fieldName)} 
				onChange={(e) => {
					register(fieldName).onChange(e);
					handleFieldChange();
				}}>
				<option key="none" value="">{capitalize(fieldName)}</option>
				{fieldOptions.map((s, i: any) => {
					return (<option value={s} key={s+i}>{s}</option>)
				})}
			</select>
		</>
	)
}


interface IndexPageProps {
  apiMonsters: APIMonster[];
}
const IndexPage = ({ apiMonsters }: IndexPageProps) => {
	const [monsters, setMonsters] = useState(apiMonsters);
	const {
    register,
		getValues
  } = useForm();

	const handleFieldChange = () => {
		const searchValues = getValues();
		const filteredMonsters = apiMonsters.filter((m) => {
			const matchesSword = !searchValues.sword || m.name.includes(searchValues.sword);
			const matchesType = !searchValues.type || searchValues.type === m.type;
			const matchesSize = !searchValues.size || searchValues.size === m.size;
			const matchesAlignment = !searchValues.alignment || searchValues.alignment === m.alignment; // TODO... Some monsters could be "Any alignment" or "Any evil", so have to consider this and include
			const matchesEnvironment = !searchValues.environment || m.environments.includes(searchValues.environment);

			return matchesSword && matchesType && matchesSize && matchesAlignment && matchesEnvironment;
		});
		setMonsters(filteredMonsters);
	}

	const searchTypes = [...new Set(apiMonsters.map(m => m.type))].sort((a, b) => a.localeCompare(b));
	const searchSizes = [...new Set(apiMonsters.map(m => m.size))].sort((a, b) => b.localeCompare(a));
	const searchAlignments = [...new Set(apiMonsters.map(m => m.alignment))].sort((a, b) => a.localeCompare(b));
	const searchEnvironments = [...new Set(apiMonsters.map(m => m.environments).flat(1))].sort((a, b) => a.localeCompare(b));

  return (
    <Main
      meta={
        <Meta
          title={AppConfig.title}
          description={AppConfig.description}
        />
      }
    >
      <div role="search" className="bg-gray-700">
				<div className="container max-w-3xl mx-auto p-10">
					<div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
						<div className="grid place-items-center h-full w-12 text-gray-300">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</div>

						<input
							className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
							type="text"
							id="sword"
							placeholder="Search something.." 
							{...register('sword')} 
							onChange={(e) => {
								register('sword').onChange(e);
								handleFieldChange()
							}}
						/>
					</div>

					<div className="relative flex items-center w-full gap-4">
						<SearchSelect fieldName="size" fieldOptions={searchSizes} register={register} handleFieldChange={handleFieldChange} />

						<SearchSelect fieldName="alignment" fieldOptions={searchAlignments} register={register} handleFieldChange={handleFieldChange} />
					</div>

					<div className="relative flex items-center w-full gap-4">
						<SearchSelect fieldName="type" fieldOptions={searchTypes} register={register} handleFieldChange={handleFieldChange} />

						<SearchSelect fieldName="environment" fieldOptions={searchEnvironments} register={register} handleFieldChange={handleFieldChange} />
					</div>
				</div>
			</div>
			
			<div className="container mx-auto px-6 my-10">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal">
						<thead>
							<tr>
								<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider pr-0"></th>
								<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Name
								</th>
								<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Type
								</th>
								<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Size
								</th>
								<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Alignment
								</th>
								<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Environments
								</th>
							</tr>
						</thead>
						<tbody>
							{monsters && monsters.length > 0 && monsters.map((m) => {
								return (
									<tr key={m.key} className="hover:bg-gray-50 hover:cursor-pointer relative">
										<td className="px-5 py-3 border-b border-gray-200 text-sm w-0 pr-0">
											<Link 
												href={`/monsters/${m.key}`} 
												className="absolute h-full w-full top-0" 
												aria-label={`Link to ${m.name}`}/>{/* Cant wrap table row in an anchor, this seems like best UX option */}
											<img className="rounded-full object-contain"
												src={m.imageUrl}
												alt={`Thumbnail of ${m.name}`} 
												style={{minWidth: 40, height: 40}} />
										</td>
										<td className="px-5 py-2 border-b border-gray-200 text-sm">
											<p className="text-gray-900 whitespace-no-wrap">
												{m.name}
											</p>
										</td>
										<td className="px-5 py-3 border-b border-gray-200 text-sm">
											<p className="text-gray-900 whitespace-no-wrap">
												{m.type}
											</p>
										</td>
										<td className="px-5 py-3 border-b border-gray-200 text-sm">
											<p className="text-gray-900 whitespace-no-wrap">
												{m.size}
											</p>
										</td>
										<td className="px-5 py-3 border-b border-gray-200 text-sm">
											<p className="text-gray-900 whitespace-no-wrap">
												{m.alignment}
											</p>
										</td>
										<td className="px-5 py-3 border-b border-gray-200 text-sm">
											<p className="text-gray-900 whitespace-no-wrap">
												{m.environments.join(', ')}
											</p>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	console.log('fetching monsters');
	console.log(getBaseUrl(req));
	console.log(`${getBaseUrl(req)}/api/monsters`);
  const res = await fetch(`${getBaseUrl(req)}/api/monsters`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const apiMonsters = await res.json();

  return {
    props: { 
			apiMonsters
		},
  };
}

export default IndexPage;
