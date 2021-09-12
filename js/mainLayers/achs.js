addLayer("A", {
    name: "Achievements",
	startData() { return {unlocked: true}},
	color: "#ffff00",
	symbol: "A",
	row: "side",
	position: 0,
	layerShown() { return true },
    tooltip: "Achievements", 
    achievements: {
        11: {
            name: "First",
            tooltip:"Buy the first upgrade.\nReward: Multiply point gain by 1.25. ",
            done()  {
                if (hasUpgrade('N',11)) return true
            }
        },
        12: {
            name: "Super Click",
            tooltip:"Buy the fourth upgrade.\nReward: Triple number gain.",
            done()  {
                if (hasUpgrade('N',14)) return true
            }
        },
        13: {
            name: "Factor",
            tooltip:"Get a Factor.",
            done()  {
                if (hasMilestone('F',1)) return true
            }       
         },
         14: {
            name: "Challenged",
           tooltip:"Complete '/ factor'.\nReward: Double number gain.",
            done()  {
                if (hasChallenge('F',11)) return true
            }
        },
        15: {
            name: "Automation",
            tooltip:"Get 5 factors.",
            done()  {
                if (hasMilestone('F',5)) return true
            }
        },
        16: {
            name: "Ten Upgrades",
            tooltip:"Buy 10 upgrades.",
            done()  {
                if (hasUpgrade('N',23)) return true
            }
        },
        17: {
            name: "More and More",
            tooltip:"Get an upgrade factor.",
            done()  {
                if (hasMilestone('UF',1)) return true
            }
        },
        21: {
            name: "Base++",
            tooltip:"Buy 12 number upgrades.",
            done()  {
                if (hasUpgrade('N',32)) return true
            }
        },
        22: {
            name: "Buyable Challenge?",
            tooltip:"Complete 'Buyable Upgrader' once.",
            done()  {
                if (challengeCompletions('UF', 11)>=1) return true
            }
        },
        23: {
            name: "Buyable Challenge!",
            tooltip:"Complete 'Buyable Upgrader' three times.",
            done()  {
                if (challengeCompletions('UF', 11)>=3) return true
            }
        },
        24: {
            name: "~2^10 Factor",
            tooltip:"Reach 1,000 Factors.",
            done()  {
                if (hasMilestone('F', 1000)) return true
            }
        },
        25: {
            name: "One to Fifteen",
            tooltip:"Buy 15 number upgrades.",
            done()  {
                if (hasUpgrade('N', 35)) return true
            }
        },
        26: {
            name: "Super Challenged",
            tooltip:"Complete 'Super 3 in 1'.",
            done()  {
                if (hasChallenge('F', 43)) return true
            }
        },
      
        27: {
            name: "Inflatity",
            tooltip:"Infinity once.",
            done()  {
                if (hasMilestone('I', 1)) return true
            }
        },
        31:{
            name: "Omega Cheaper",
            tooltip:"Buy 18 number upgrades.\nReward: Quintiple number gain.",
            done()  {
                if (hasUpgrade('N',43)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },
        32:{
            name: "Second Infinity",
            tooltip:"Infinity twice.\nReward: Unlock a new upgrade.",
            done()  {
                if (hasMilestone('I',2)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },
        33:{
            name: "Free Infinity",
            tooltip:"Infinity 3 times.",
            done()  {
                if (hasMilestone('I',3)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },
        34:{
            name: "True Infinity",
            tooltip:"Reach 1.8e308 points.",
            done()  {
                if (player.points.gte(1.79e308)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },
        35:{
            name: "Impossible?",
            tooltip:"Reach 1.8e258 numbers in IC2.\nReward: Gain 1e50x more numbers and unlock 3 Infinity challenges.",
            done()  {
                if (player.N.points.gte(1.79e258)&&inChallenge('I',12)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },  
        36:{
            name: "Ordinal Markup",
            tooltip:"Do a Factor Shift.",
            done()  {
                if (player.FS.points.gte(1)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },  
        37:{
            name: "I found the missing one!",
            tooltip:"Get '-3'!",
            done()  {
                if (hasUpgrade('NN',13)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },  
        41:{
            name: "Don't forget achievements.",
            tooltip:"Reach 1e50 negative numbers in IC5.\nReward: Unlock a number buyable.",
            done()  {
                if (player.NN.points.gte(1e50)&&inChallenge('I',31)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },  
        42:{
            name: "I forgot achievements...",
            tooltip:"Get an Infinity Point.",
            done()  {
                if (player.IP.points.gte(1)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },  
        43:{
            name: "Twofinity Challenge",
            tooltip:"Complete the first IP challenge.",
            done()  {
                if (hasChallenge('IP',11)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },  
        44:{
            name: "Nine Eggs",
            tooltip:"Buy 9 IP upgrades.",
            done()  {
                if (hasUpgrade('IP',33)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        },  
        45:{
            name: "Omega Upgrade",
            tooltip:"Buy 23 Factor upgrades.\nReward: Gain x100,000 more numbers.",
            done()  {
                if (hasUpgrade('F',36)) return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        }, 
        46:{
            name: "Don't forget achievements again.",
            tooltip:"Reach 1e25000 numbers in IC3.\nReward: Unlock an Infinity challenge.",
            done()  {
                if (player.N.points.gte("1e25000")&&inChallenge('I',21))  return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        }, 
        47:{
            name: "+ - x / ^",
            tooltip:"Get a Mathematics Symbol.",
            done()  {
                if (hasMilestone('MS',1))  return true
            },
            unlocked(){
                return (hasMilestone('I',1)||hasMilestone('MS',1))
            }
        }, 
        51:{
            name: "1+1+1+1+1",
            tooltip:"Reach e11111 IP.\nReward: Raise IP gain to 1.05, then multiply it by 1e40.",
            done()  {
                if (player.IP.points.gte("1e11111"))  return true
            },
            unlocked(){
                return hasMilestone('MS',1)
            }
        }, 
        52:{
            name: "The First Layer",
            tooltip:"Get a prestige point.",
            done()  {
                if (player.MS.Prestige.gte("1"))  return true
            },
            unlocked(){
                return hasMilestone('MS',1)
            }
        }, 
        53:{
            name: "Past Cheap",
            tooltip:"Complete the fourth negative number challenge.",
            done()  {
                if (hasChallenge('NN',22))  return true
            },
            unlocked(){
                return hasMilestone('MS',1)
            }
        }, 
        54:{
            name: "The Sixth Row Layer",
            tooltip:"Get a super prestige point.",
            done()  {
                if (player.MS.Prestige2.gte("1"))  return true
            },
            unlocked(){
                return hasMilestone('MS',1)
            }
        },
            55:{
                name: "Infinity Time",
                tooltip:"Get an Eternity point.",
                done()  {
                    if (player.E.points.gte("1"))  return true
                },
                unlocked(){
                    return hasMilestone('MS',1)
                }
        }, 
        56:{
            name: "-NN",
            tooltip:"Complete the 6th negative number challenge.",
            done()  {
                if (hasChallenge('NN',32))  return true
            },
            unlocked(){
                return hasMilestone('MS',1)
            }
    }, 
    57:{
        name: "Feature Factor",
        tooltip:"Get '-' from UF.",
        done()  {
            if (hasUpgrade('UF',32))  return true
        },
        unlocked(){
            return hasMilestone('MS',1)
        }
},
61:{
    name: "True OM",
    tooltip:"Get an Ordinal.",
    done()  {
        if (hasMilestone('O',1))  return true
    },
    unlocked(){
        return hasMilestone('O',1)||hasMilestone('M',1)
    }
},
62:{
    name: "Mathematician",
    tooltip:"Get a Mathematician.",
    done()  {
        if (hasMilestone('M',1))  return true
    },
    unlocked(){
        return hasMilestone('O',1)||hasMilestone('M',1)
    }
},
63:{
    name: "Get Both",
    tooltip:"Get 1 Ordinal & Mathematician.",
    done()  {
        if (hasMilestone('M',1)&&hasMilestone('O',1))  return true
    },
    unlocked(){
        return hasMilestone('O',1)||hasMilestone('M',1)
    }
},

64:{
    name: "ω Boost",
    tooltip:"Complete ω once.",
    done()  {
        if (hasMilestone('M',1)&&hasMilestone('O',1))  return true
    },
    unlocked(){
        return hasMilestone('O',1)||hasMilestone('M',1)
    }
},
65:{
    name: "Speed",
    tooltip:"Increase game speed.",
    done()  {
        if (hasMilestone('MS',8e29))  return true
    },
    unlocked(){
        return hasMilestone('O',1)||hasMilestone('M',1)
    }
},
66:{
    name: "Antimatter Dimensions?",
    tooltip:"Unlock tickspeed.",
    done()  {
        if (hasUpgrade('UF',43))  return true
    },
    unlocked(){
        return hasMilestone('O',1)||hasMilestone('M',1)
    }
},
67:{
    name: "The Greatest Shapes",
    tooltip:"Get a shape.",
    done()  {
        if (hasMilestone('S',1))  return true
    },
    unlocked(){
        return hasMilestone('O',1)||hasMilestone('M',1)
    }
},
    }
    
})