import { GetServerSideProps } from 'next';
import Meta from '@/layouts/Meta';
import Main from '@/templates/Main';
import { APIMonster } from '@/types/monster';
import { AppConfig } from '@/utils/AppConfig';
import { getBaseUrl } from '@/utils/helpers';
// @ts-ignore: Has no type library
import { Markup } from 'react-render-markup';

interface MonsterPageProps {
  apiMonster: APIMonster;
}

const MonsterPage = ({ apiMonster }: MonsterPageProps) => {
	const monster = apiMonster;

  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.title} | Monster`}
          description={AppConfig.description}
        />
      }
    >
      <div className="bg-gray-700 text-white">
				<div className="container max-w-6xl mx-auto p-10 flex gap-8 items-start">
					<div className="w-2/5 relative">
						<img src={monster.imageUrl} alt={`Picture of ${monster.name}`} className="w-full absolute top-0 border-mask" />
					</div>
					<div className="w-3/5 mt-8">
						<h1 className="text-3xl">{monster.name}</h1>
						{monster.size}<br/>
						{monster.alignment}<br/>
						{monster.type}<br/>
						{monster.environments.join(', ')}
					</div>
				</div>
			</div>
			<div className="bg-white">
				<div className="container max-w-6xl mx-auto p-10 flex gap-8">
					<div className="w-2/5"></div>
					<div className="w-3/5" style={{minHeight: 400}}>
						<Markup markup={monster.description} />
					</div>
				</div>
			</div>
    </Main>
  );
};


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
	const key = query.key;
  const res = await fetch(`${getBaseUrl(req)}/api/monsters/${key}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const apiMonster = await res.json();

  return {
    props: { 
			apiMonster
		},
  };
}

export default MonsterPage;
