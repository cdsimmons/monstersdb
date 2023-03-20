import Meta from '@/layouts/Meta';
import Main from '@/templates/Main';
import { APIMonster } from '@/types/monster';
import { useForm } from 'react-hook-form';

interface IndexPageProps {
  monsters: APIMonster[];
}



export const config = { amp: true }

const IndexPage = ({ monsters }: IndexPageProps) => {
	const {
    register,
		getValues,
    formState: { errors },
  } = useForm();

	// const monstersFiltered = 
	console.log(errors);
	const handleFieldChange = () => {
		console.log('changed', getValues())
	}

	const searchTypes = [...new Set(monsters.map(m => m.type))].sort((a, b) => a.localeCompare(b));
	const searchSizes = [...new Set(monsters.map(m => m.size))].sort((a, b) => b.localeCompare(a));
	const searchAlignments = [...new Set(monsters.map(m => m.alignment))].sort((a, b) => a.localeCompare(b));
	const searchEnvironments = [...new Set(monsters.map(m => m.environment))].sort((a, b) => a.localeCompare(b));

	// TODO... break out components, search dropdown and monster item
	// amp-bind... seems like it will let me manage to state of the form
	// If I nest if expressions a lot, maybe amp-bind isnt right
	// amp-script... when things get more complex, it seems like a wrapper and can only affects components inside it
	// Saw 2 jobs after a short search asking for AMP experience... so maybe lets just build this with AMP and move on
	// Maybe, lets run some tests... we can do it AMP way, and we can do it non-AMP way, and see which actually loads/runs faster

  return (
    <Main
      meta={
        <Meta
          title="Monster DB"
          description="Find monsters for your story/campaign"
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

					<div className="relative flex items-center w-full">
						<label htmlFor="type" className="sr-only">Select by type</label>
						<select 
							id="type" 
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option key="none">Type</option>
							{searchTypes.map((s, i) => {
								return (<option value={s} key={s+i}>{s}</option>)
							})}
						</select>

						<label htmlFor="type" className="sr-only">Select by size</label>
						<select 
							id="size" 
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option key="none">Size</option>
							{searchSizes.map((s, i) => {
								return (<option value={s} key={s+i}>{s}</option>)
							})}
						</select>
					</div>

					<div className="relative flex items-center w-full">
						<label htmlFor="type" className="sr-only">Select by alignment</label>
						<select 
							id="type" 
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option key="none">Alignment</option>
							{searchAlignments.map((s, i) => {
								return (<option value={s} key={s+i}>{s}</option>)
							})}
						</select>

						<label htmlFor="type" className="sr-only">Select by environment</label>
						<select 
							id="type" 
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option key="none">Environment</option>
							{searchEnvironments.map((s, i) => {
								return (<option value={s} key={s+i}>{s}</option>)
							})}
						</select>
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
									CR
								</th>
							</tr>
						</thead>
						<tbody>
							{monsters && monsters.length > 0 && monsters.map((m) => {
								return (
									<tr key={m.key}>
										<td className="px-5 py-3 border-b border-gray-200 bg-white text-sm w-0 pr-0">
											<amp-img className="rounded-full object-contain"
												src={m.imageUrl}
												alt={`Thumbnail of ${m.name}`} 
												style={{minWidth: 40, height: 40}}
												height="40"
												width="40"
												layout="responsive" />
										</td>
										<td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
											<p className="text-gray-900 whitespace-no-wrap">
												{m.name}
											</p>
										</td>
										<td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
											<p className="text-gray-900 whitespace-no-wrap">
												{m.type}
											</p>
										</td>
										<td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
											<p className="text-gray-900 whitespace-no-wrap">
												{m.size}
											</p>
										</td>
										<td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
											<p className="text-gray-900 whitespace-no-wrap">
												{m.alignment}
											</p>
										</td>
										<td className="px-5 py-3 border-b border-gray-200 bg-white text-sm w-0">
											<span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
												<span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
												<span className="relative">12</span>
											</span>
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

export const getServerSideProps = async () => {
  const res = await fetch(`http://localhost:3000/api/monsters`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const monsters = await res.json();

  return {
    props: { 
			monsters
		},
  };
}

export default IndexPage;
