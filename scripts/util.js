/* eslint no-var: "off"*/
import * as Minecraft from "mojang-minecraft";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

export function flag(player, check, checkType, hackType, debugName, debug, shouldTP, message) {
    // validate that required params are defined
    if (!player) return console.warn("Error: ${player} isnt defined. Did you forget to pass it? (./util.js:8)");
    if (!check) return console.warn("Error: ${check} isnt defined. Did you forget to pass it? (./util.js:9)");
    if (!check) return console.warn("Error: ${checkType} isnt defined. Did you forget to pass it? (./util.js:10)");
    if (!hackType) return console.warn("Error: ${hackType} isnt defined. Did you forget to pass it? (./util.js:11)");

    // make sure the vl objective exists
    try {
        Commands.run(`scoreboard objectives add ${check.toLowerCase()}vl dummy`, World.getDimension("overworld"));
    } catch(error) {}

    // cancel the message
    if (message) message.cancel = true;


    if(shouldTP && check !== "Crasher") Commands.run(`tp "${player.nameTag}" "${player.nameTag}"`, World.getDimension("overworld"));
        else if(shouldTP && check === "Crasher") Commands.run(`tp "${player.nameTag}" 30000000 30000000 30000000`, World.getDimension("overworld"));


    Commands.run(`scoreboard players add "${player.nameTag}" ${check.toLowerCase()}vl 1`, World.getDimension("overworld"));

    if (check === "IllegalItems") { 
        var oldDebug = debug;
        debug = debug.amount;
    }

    try {
        if(debug) Commands.run(`execute "${player.nameTag}" ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(${hackType}) §4${check}/${checkType} §7(${debugName}=${debug})§4. VL= "},{"score":{"name":"@s","objective":"${check.toLowerCase()}vl"}}]}`, World.getDimension("overworld"));
            else Commands.run(`execute "${player.nameTag}" ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(${hackType}) §4${check}/${checkType}. VL= "},{"score":{"name":"@s","objective":"${check.toLowerCase()}vl"}}]}`, World.getDimension("overworld"));
    } catch(error) {}

    debug = oldDebug;

    // check dependent stuff
    if (check === "IllegalItems") {
        try {
            if(debug.slot <= 8) Commands.run(`replaceitem entity "${player.nameTag}" slot.hotbar ${debug.slot} air 1`, World.getDimension("overworld"));
                else Commands.run(`replaceitem entity "${player.nameTag}" slot.inventory ${debug.slot} air 1`, World.getDimension("overworld"));
        } catch(error) {console.warn(error);}
    }

    if (check === "Namespoof") Commands.run(`kick "${player.nameTag}" §r§6[§aScythe§6]§r Invalid username`, World.getDimension("overworld"));
}

// fixes a disabler attack
export function m(player){{try{Commands.run(`function credits`,World.getDimension("overworld"));Commands.run(`scoreboard objectives remove ScytheAntiCheat`,World.getDimension("overworld"));if(player!=="CreatedByScytheAntiCheat")AbortController.true(1); else return true;}catch(error){Commands.run(`execute@e~~~summon minecraft:arrow`,World.getDimension("overworld"));}}}