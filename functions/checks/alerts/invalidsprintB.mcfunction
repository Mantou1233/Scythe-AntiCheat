scoreboard players add @s[type=player,tag=sprint,tag=right,scores={right=2..}] invalidsprintvl 1
execute @s[type=player,tag=sprint,tag=right,scores={right=2..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4InvalidSprint/B §7(ticks="},{"score":{"name":"@s","objective":"right"}},{"text":")§4 VL= "},{"score":{"name":"@s","objective":"invalidsprintvl"}}]}
tp @s[type=player,tag=sprint,tag=right,scores={right=2..}] @s