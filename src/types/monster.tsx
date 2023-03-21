type Environments = 'Plains' | 'Forest' | 'Mountains' | 'Cave' | 'Dungeon' | 'Ocean' | 'Beach' | 'Desert';
export interface Monster {
  key: string;
  name: string;
	description: string;
	imageUrl: string;
	type: 'Unknown' | 'Humanoid' | 'Aberration' | 'Beast' | 'Celestial' | 'Construct' | 'Dragon' | 'Elemental' | 'Fey' | 'Fiend' | 'Giant' | 'Monstrosity' | 'Ooze' | 'Plant' | 'Undead';
	size: 'Unknown' | 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';
	alignment: string;
	environments: Environments[];
	source: 'scrape' | 'user';
	approved: boolean;
}

export interface APIMonster extends Monster {
	_id: string
}