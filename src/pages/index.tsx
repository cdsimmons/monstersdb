import Meta from '@/layouts/Meta';
import Main from '@/templates/Main';
import { APIMonster } from '@/types/monster';
import { capitalize } from '@/utils/helpers';
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { AppConfig } from '@/utils/AppConfig';
import { connectToDatabase } from '@/utils/mongodb';


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
  stringifiedMonsters: string;
}
const IndexPage = ({ stringifiedMonsters }: IndexPageProps) => {
	const monsters: APIMonster[] = JSON.parse(stringifiedMonsters);
	const [filteredMonsters, setFilteredMonsters] = useState(monsters);
	const {
    register,
		getValues
  } = useForm();

	const handleFieldChange = () => {
		const searchValues = getValues();
		const nextFilteredMonsters = monsters.filter((m) => {
			const matchesSword = !searchValues.sword || m.name.includes(searchValues.sword);
			const matchesType = !searchValues.type || searchValues.type === m.type;
			const matchesSize = !searchValues.size || searchValues.size === m.size;
			const matchesAlignment = !searchValues.alignment || searchValues.alignment === m.alignment; // TODO... Some monsters could be "Any alignment" or "Any evil", so have to consider this and include
			const matchesEnvironment = !searchValues.environment || m.environments.includes(searchValues.environment);

			return matchesSword && matchesType && matchesSize && matchesAlignment && matchesEnvironment;
		});
		setFilteredMonsters(nextFilteredMonsters);
	}

	const searchTypes = [...new Set(monsters.map(m => m.type))].sort((a, b) => a.localeCompare(b));
	const searchSizes = [...new Set(monsters.map(m => m.size))].sort((a, b) => b.localeCompare(a));
	const searchAlignments = [...new Set(monsters.map(m => m.alignment))].sort((a, b) => a.localeCompare(b));
	const searchEnvironments = [...new Set(monsters.map(m => m.environments).flat(1))].sort((a, b) => a.localeCompare(b));

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
					<div className="table bg-white min-w-full leading-normal">
						<div className="table-row">
							<div className="table-cell align-middle px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider pr-0"></div>
							<div className="table-cell align-middle px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Name
							</div>
							<div className="table-cell align-middle px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Type
							</div>
							<div className="table-cell align-middle px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Size
							</div>
							<div className="table-cell align-middle px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Alignment
							</div>
							<div className="table-cell align-middle px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Environments
							</div>
						</div>
						{filteredMonsters && filteredMonsters.length > 0 && filteredMonsters.map((m) => {
							return (
								<Link href={`/monsters/${m.key}`} aria-label={`Link to ${m.name}`} className="hover:bg-gray-50 table-row relative" key={m.key}>
									<div className="table-cell align-middle px-5 py-3 border-b border-gray-200 text-sm w-0 pr-0">
										<img className="rounded-full object-contain"
											src={m.imageUrl}
											alt={`Thumbnail of ${m.name}`} 
											style={{minWidth: 40, height: 40}} />
									</div>
									<div className="table-cell align-middle px-5 py-2 border-b border-gray-200 text-sm">
										<p className="text-gray-900 whitespace-no-wrap">
											{m.name}
										</p>
									</div>
									<div className="table-cell align-middle px-5 py-3 border-b border-gray-200 text-sm">
										<p className="text-gray-900 whitespace-no-wrap">
											{m.type}
										</p>
									</div>
									<div className="table-cell align-middle px-5 py-3 border-b border-gray-200 text-sm">
										<p className="text-gray-900 whitespace-no-wrap">
											{m.size}
										</p>
									</div>
									<div className="table-cell align-middle px-5 py-3 border-b border-gray-200 text-sm">
										<p className="text-gray-900 whitespace-no-wrap">
											{m.alignment}
										</p>
									</div>
									<div className="table-cell align-middle px-5 py-3 border-b border-gray-200 text-sm">
										<p className="text-gray-900 whitespace-no-wrap">
											{m.environments.join(', ')}
										</p>
									</div>
								</Link>
							)
						})}
					</div>
				</div>
			</div>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const client = await connectToDatabase();
	const db = client.db(process.env.MONGODB_DB);

	const dbMonsters = await db
		.collection('monsters')
		.find({})
		.sort({ name: 1 })
		.toArray();

  return {
    props: { 
			stringifiedMonsters: JSON.stringify(dbMonsters)
		},
  };
}

export default IndexPage;
