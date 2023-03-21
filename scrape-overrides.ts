import { Monster } from "@/types/monster";

export const scrapeBlacklist = ['frog', 'mastiff', 'triceratops', 'tyrannosaurus-rex'];

interface ScrapeOverrides {
	[key: string]: { environments: Monster['environments'], alignment?: string }
}
export const scrapeOverrides: ScrapeOverrides = {
	'adult-red-dragon': {
		environments: ['Mountains', 'Dungeon', 'Desert']
	},
	'air-elemental': {
		environments: ['Mountains', 'Plains', 'Desert']
	},
	'animated-armor': {
		environments: ['Dungeon']
	},
	'ankylosaurus': {
		environments: ['Forest', 'Mountains']
	},
	'axe-beak': {
		environments: ['Forest', 'Plains']
	},
	'banshee': {
		environments: ['Dungeon']
	},
	'basilisk': {
		environments: ['Forest', 'Mountains']
	},
	'beholder': {
		environments: ['Dungeon']
	},
	'blink-dog': {
		environments: ['Plains', 'Dungeon']
	},
	'bugbear': {
		environments: ['Plains', 'Dungeon', 'Mountains']
	},
	'bulette': {
		environments: ['Cave', 'Mountains']
	},
	'centaur': {
		environments: ['Plains', 'Mountains', 'Forest']
	},
	'chimera': {
		environments: ['Dungeon', 'Forest']
	},
	'cloud-giant': {
		environments: ['Plains', 'Mountains', 'Forest', 'Desert'],
		alignment: 'Neutral'
	},
	'cockatrice': {
		environments: ['Mountains', 'Desert', 'Dungeon']
	},
	'cyclops': {
		environments: ['Mountains', 'Dungeon', 'Plains', 'Forest', 'Desert']
	},
	'death-dog': {
		environments: ['Plains', 'Desert', 'Dungeon']
	},
	'displacer-beast': {
		environments: ['Plains', 'Forest', 'Dungeon']
	},
	'doppelganger': {
		environments: ['Mountains', 'Dungeon', 'Plains', 'Forest', 'Desert', 'Cave', 'Beach']
	},
	'duergar': {
		environments: ['Mountains', 'Dungeon']
	},
	'earth-elemental': {
		environments: ['Mountains', 'Cave', 'Desert']
	},
	'fire-elemental': {
		environments: ['Mountains', 'Cave', 'Desert']
	},
	'fire-giant': {
		environments: ['Dungeon', 'Mountains', 'Desert']
	},
	'flameskull': {
		environments: ['Dungeon', 'Mountains', 'Desert']
	},
	'flesh-golem': {
		environments: ['Dungeon', 'Mountains', 'Desert']
	},
	'flying-snake': {
		environments: ['Forest']
	},
	'flying-sword': {
		environments: ['Dungeon']
	},
	'frost-giant': {
		environments: ['Mountains', 'Cave', 'Plains']
	},
	'gargoyle': {
		environments: ['Dungeon', 'Mountains']
	},
	'gelatinous-cube': {
		environments: ['Dungeon', 'Mountains', 'Cave']
	},
	'ghost': {
		environments: ['Mountains', 'Dungeon', 'Plains', 'Forest', 'Desert', 'Cave', 'Beach', 'Ocean']
	},
	'ghoul': {
		environments: ['Mountains', 'Dungeon', 'Plains', 'Forest', 'Desert', 'Cave', 'Beach', 'Ocean']
	},
	'giant-fire-beetle': {
		environments: ['Mountains', 'Cave', 'Desert']
	},
	'giant-spider': {
		environments: ['Forest', 'Cave', 'Mountains', 'Dungeon']
	},
	'gnoll': {
		environments: ['Dungeon', 'Cave', 'Mountains', 'Plains', 'Forest']
	},
	'goblin': {
		environments: ['Dungeon', 'Cave', 'Mountains', 'Plains', 'Forest']
	},
	'grick': {
		environments: ['Cave', 'Mountains']
	},
	'griffon': {
		environments: ['Mountains', 'Plains']
	},
	'harpy': {
		environments: ['Mountains', 'Plains', 'Forest']
	},
	'hill-giant': {
		environments: ['Mountains', 'Plains', 'Forest']
	},
	'hippogriff': {
		environments: ['Mountains', 'Plains']
	},
	'hobgoblin': {
		environments: ['Dungeon', 'Cave', 'Mountains', 'Plains', 'Forest']
	},
	'hydra': {
		environments: ['Dungeon', 'Cave', 'Mountains', 'Ocean']
	},
	'kobold': {
		environments: ['Dungeon', 'Cave', 'Mountains', 'Plains', 'Forest']
	},
	'kuo-toa': {
		environments: ['Beach', 'Ocean']
	},
	'lich': {
		environments: ['Dungeon']
	},
	'lizardfolk': {
		environments: ['Forest']
	},
	'manticore': {
		environments: ['Dungeon']
	},
	'medusa': {
		environments: ['Dungeon']
	},
	'merfolk': {
		environments: ['Beach', 'Ocean']
	},
	'mind-flayer': {
		environments: ['Dungeon']
	},
	'minotaur': {
		environments: ['Dungeon']
	},
	'mummy': {
		environments: ['Dungeon']
	},
	'nothic': {
		environments: ['Dungeon']
	},
	'ochre-jelly': {
		environments: ['Dungeon', 'Cave', 'Plains', 'Forest']
	},
	'ogre': {
		environments: ['Plains', 'Forest', 'Mountains']
	},
	'orc': {
		environments: ['Plains', 'Forest', 'Mountains', 'Desert']
	},
	'owlbear': {
		environments: ['Plains', 'Forest', 'Mountains']
	},
	'pegasus': {
		environments: ['Plains', 'Forest', 'Mountains']
	},
	'phase-spider': {
		environments: ['Cave', 'Dungeon']
	},
	'plesiosaurus': { // Dino... maybe remove, but short on ocean monsters...
		environments: ['Ocean']
	},
	'quipper': {
		environments: ['Ocean']
	},
	'rust-monster': {
		environments: ['Cave', 'Mountains', 'Desert']
	},
	'satyr': {
		environments: ['Forest']
	},
	'spectator': {
		environments: ['Dungeon']
	},
	'stirge': {
		environments: ['Dungeon', 'Cave', 'Mountains', 'Desert']
	},
	'stone-giant': {
		environments: ['Mountains', 'Cave']
	},
	'stone-golem': {
		environments: ['Mountains', 'Cave', 'Desert']
	},
	'storm-giant': {
		environments: ['Mountains', 'Desert']
	},
	'tarrasque': {
		environments: ['Mountains', 'Dungeon', 'Plains', 'Forest', 'Desert', 'Cave']
	},
	'troll': {
		environments: ['Mountains', 'Plains', 'Forest', 'Cave']
	},
	'twig-blight': {
		environments: ['Forest']
	},
	'umber-hulk': {
		environments: ['Dungeon', 'Cave']
	},
	'water-elemental': {
		environments: ['Beach', 'Ocean']
	},
	'werebear': {
		environments: ['Mountains', 'Plains', 'Forest', 'Cave']
	},
	'wereboar': {
		environments: ['Plains', 'Forest', 'Cave']
	},
	'wererat': {
		environments: ['Plains', 'Forest', 'Cave']
	},
	'weretiger': {
		environments: ['Plains', 'Forest', 'Cave']
	},
	'werewolf': {
		environments: ['Mountains', 'Plains', 'Forest', 'Cave', 'Dungeon']
	},
	'wight': {
		environments: ['Dungeon']
	},
	'winter-wolf': {
		environments: ['Mountains', 'Cave', 'Forest']
	},
	'worg': {
		environments: ['Mountains', 'Cave', 'Forest']
	},
	'wyvern': {
		environments: ['Mountains', 'Cave', 'Plains']
	},
	'yeti': {
		environments: ['Mountains', 'Cave']
	},
	'young-green-dragon': {
		environments: ['Mountains', 'Cave', 'Forest', 'Plains']
	},
	'yuan-ti-abomination': {
		environments: ['Forest', 'Plains']
	},
	'yuan-ti-malison': {
		environments: ['Forest', 'Plains']
	},
	'yuan-ti-pureblood': {
		environments: ['Forest', 'Plains']
	},
	'zombie': {
		environments: ['Mountains', 'Dungeon', 'Plains', 'Forest', 'Desert', 'Cave', 'Beach', 'Ocean']
	},
}