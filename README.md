Loot Quest
=======

*A top-down, 2D mini action adventure game. Explore this strange place you are in, defeat monsters, collect epic loot, and discover your destiny.*

About the challenge
---
I built this game as part of my "build one game a week" challenge: one game per week, every week, even if it's crap (release often, fail often, and learn). I'm hoping to get better at game development during this process by pushing myself to deliver something every week and learning from previous weeks. Hopefully by releasing the source code to each game, my journey can be useful to you too.

Visit <http://www.burningtomato.com> for more info on my challenge. You can also follow me on Twitter: <https://twitter.com/burningtomato>.

Building the source code
---
You will need NodeJS and the Grunt CLI to build the source code.

1. Clone the git repository `git clone` to a new directory
2. Install the NodeJS dependencies by issuing the `npm install` command in a terminal
3. Compile the source code by issuing the `grunt` command in a terminal

Some side notes:

- Make sure you serve the files from a http:// address rather than a files:// address. Due to some security policies things may not work correctly otherwise.
- If you use an IDE, be sure to set up a file watcher so Grunt is ran automatically when you make changes. It'll make your life a lot easier.
- Your browser needs to have support for HTML5 and Canvas, obviously.

To compile the `game.scss` file, you will need to use SASS. For development convenience, I recommend setting this up as a file watcher task.

Editing & creating maps
---
For this game, I have used the *Tiled* application to edit maps. You can create and open the *.json files in assets/maps using this tool. To quickly get started, I recommend working off one of the existing maps as a base template.

Note: Certain tiled features, such as objects and shapes are not supported and will not appear in-game.

### Map properties
These are properties set on the map itself.

- **`soundscape`**: The value of this property will be played as background music/audio on loop while this map is active (example: `creepy.mp3`).
- **`script`**: This is the name of the map script that will be executed when the map is loaded.
- **`spawn_initial`**: This is the default spawn position, in three comma seperated bits (X Coord, Y Coord, and Orientation). For example `10,9,3` becomes X1, Y9, Right orientation (3).
- **`spawn_dungeon_2`** This is an example of a spawn from another map. In this case, if a player walks in to this map from the `dungeon_2` map, they will spawn in this position (same format as `spawn_initial`). 

### Layer properties
These are properties that can be set on each layer.

- **`spawn`**: If set, each tile that is not empty on this layer will spawn an entity. The type of entity is determined based on the value of this property. Possible values at the moment: `goblin`, `pot`, `chest`, `coin`.
- **`blocked`**: If set to value "1", each tile that is not empty on this layer will be blocked for movement by both the player and NPCs.
- **`blocked_npc`**: If set to value "1", each tile that is not empty on this layer will be blocked for movement for NPCs only (player is not affected).
- **`teleport`**: Set this to the ID of the map you wish to teleport the player to when they stand on this square. When the player touches the square, they will keep moving for a second or so in the current direction, and then teleport onto the next map. See the `spawn_x` map property to determine where the player will appear on the other map.

License
---
This game, and all my other games developed as part of this challenge, are available under the MIT license. See the included LICENSE file for details.

**Important:** For specific license information regarding third-party assets used in this game, please see the included CREDITS file.