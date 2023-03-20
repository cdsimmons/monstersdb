import Meta from '@/layouts/Meta';
import Main from '@/templates/Main';
import { APIMonster } from '@/types/monster';

interface MonsterPageProps {
  monster: APIMonster;
}

const MonsterPage = ({ monster }: MonsterPageProps) => {
  return (
    <Main
      meta={
        <Meta
          title="Monster DB | Monster"
          description="Find monsters for your story/campaign"
        />
      }
    >
      <div role="search" className="bg-gray-700">
				<div className="container max-w-3xl mx-auto p-10">
					{monster.name}
				</div>
			</div>
			
    </Main>
  );
};


export const getServerSideProps = async (context: any) => {
	const key = context.query.key;
  const res = await fetch(`http://localhost:3000/api/monsters/${key}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const monster = await res.json();

  return {
    props: { 
			monster
		},
  };
}

export default MonsterPage;
