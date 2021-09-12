addLayer("NN", {
    name: "Negative numbers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "NN", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ffa0ff",
    requires(){
        if(player.X.points.gte(1)){
          if(inChallenge("I",21))return new Decimal("e190")
          if(inChallenge("I",11))return new Decimal("e266")
          return new Decimal("e1250")
        }
        if(hasMilestone('I',7)&&((inChallenge('I',11))||(inChallenge('I',12))||(inChallenge('I',21))||(inChallenge('I',31)))) return new Decimal("1e400")
        if(hasMilestone('I',6)&&((inChallenge('I',11))||(inChallenge('I',12))||(inChallenge('I',21)))) return new Decimal("1e470")
        else return new Decimal("1e940")
    }, // Can be a function that takes requirement increases into account
    resource(){return "Negative numbers"
    }, // Name of prestige currency
    baseResource: "Numbers", // Name of resource prestige is based on
    baseAmount() {return player.N.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
     return 0.01
    },
    branches:["N"],
     // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('IP',11)) mult = mult.times(buyableEffect('NN',11))
        if (hasMilestone('I',69)) mult = mult.times(player.I.points.add(1).pow(7.5))
        if (hasAchievement('A',41)) mult = mult.times(buyableEffect('N',22))
        if (hasUpgrade('F', 42)) mult = mult.times(player.F.points.add(1))
         if (hasMilestone('I',4)) mult = mult.times(10)
         if (hasUpgrade('IP',44)) mult = mult.times("1e80000")
        if (hasUpgrade('NN',14)) mult = mult.times(upgradeEffect('NN', 14))
        if (hasUpgrade('IP', 21)) mult = mult.times(player.IP.points.pow(10).add(1))
        if(hasMilestone('I',5)&&player.X.points.gte(1)) mult=mult.times(new Decimal(1.1).pow(player.I.points))
        if(hasMilestone('NN',3.14e16)&&player.X.points.gte(1))mult=mult.times(player.UF.CP.add(1))
      if(inChallenge('I',12))mult=mult.min(1e25)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let mult=new Decimal(1) 
        if (hasChallenge('IP',11)) mult = mult.times(1.1)
        if (hasChallenge('IP',12)) mult = mult.times(1.15)
        if (hasChallenge('IP',21)) mult = mult.times(1.2)
        if (hasChallenge('IP',22)) mult = mult.times(1.25)
        if (inChallenge('I',51)) mult = mult.times(1.2)
        if (inChallenge('I',52)) mult = mult.times(1.4)
        if (inChallenge('I',61)) mult = mult.times(1.8)
        if (inChallenge('I',62)) mult = mult.times(3)
        if (hasMilestone('IP',10000)) mult = mult.times(1.05)
        if(inChallenge('E',11)&&(!player.E.NNpower.gte(1))) mult = mult.times(0)
        if((inChallenge('NN',32)||hasChallenge('NN',32))&&!hasUpgrade('N',71)) mult = mult.times(0)
        
        return mult
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "N", description: "shift + N: Reset for Negative number", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.UF.unlocked) doReset("NN") },
        unlocked() {return hasMilestone('I', 3)} // Determines if you can use the hotkey, optional
    },
    ],
    softcap(){if (hasMilestone('MS',2))return new Decimal("eee1000") 
else return new Decimal("1e450000") },
    softcapPower(){return new Decimal("0.00000001") },
  
    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "-1",
            description: "Multiply number gain by 10,000.",
            cost(){
              if(player.X.points.gte(1))return new Decimal(100)
              return new Decimal(2)
            },
        },
        12: {
            title: "-2",
            description:"Negative numbers boost point gain.",
            cost(){
              if(player.X.points.gte(1))return new Decimal(1337)
              return new Decimal(5)
            },
            effect() {
                if(inChallenge('NN',11)||hasChallenge('NN',11))return new Decimal("1")
                if(inChallenge('IP',32))return new Decimal("1")
                if(inChallenge('IP',22))return new Decimal("1")
                else if (player.NN.points.gte("1e1000")) return new Decimal("1e5000")
                else if(hasUpgrade('IP',22)) return player.NN.points.add(1).pow(5)
                else if (player.NN.points >=1e250) return new Decimal("1e1500")
                else if(hasUpgrade('NN',34)) return player.NN.points.add(1).pow(6)
                else if (player.NN.points >=1e40) return new Decimal("1e600")
                else if(hasUpgrade('NN',24)&&player.X.points.lt(1)) return player.NN.points.add(1).pow(15)
                else if (player.NN.points >=1e24) return 1e300
                else if(hasUpgrade('NN',23)) return player.NN.points.add(1).pow(12.5)
                else if(hasUpgrade('NN',22)||hasUpgrade('NN',24)&&player.X.points.gte(1)) return player.NN.points.add(1).pow(player.X.points.gte(1)?7:10).min(1e150)
                else if (player.NN.points >=3981071705.53) return 1e72
                
                else if(hasUpgrade('NN',21)) return player.NN.points.pow(0.75).add(1).pow(player.X.points.gte(1)?7:10)
                else    return player.NN.points.pow(0.5).add(1).pow(15).min(1e30)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade("NN", 11)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
            },
        },
        13: {
            title: "-3",
            description: "Points boost itself.",
            cost(){
              if(player.X.points.gte(1))return new Decimal(1e69)
              return new Decimal(25)
            },
            effect() {
                if(inChallenge('NN',11)||hasChallenge('NN',11))return new Decimal("1")
                if(inChallenge('IP',32))return new Decimal("1")
                if (player.points.gte("1e10000")) return new Decimal("1e2000")
                else if(hasUpgrade('IP',32)) return player.points.add(1).pow(0.2)
                else if (hasUpgrade('NN',31)) return player.points.add(1).pow(0.15)
                else return 1
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return hasUpgrade("NN", 31)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        },
    },
    14: {
        title: "-4",
        description: "Negative numbers boost itself.",
        cost(){
          if(player.X.points.gte(1))return new Decimal(21337)
          return new Decimal(15)
        },
        effect() {
            if(inChallenge('NN',11)||hasChallenge('NN',11))return new Decimal("1")
            if(inChallenge('IP',32))return new Decimal("1")
            if(inChallenge('IP',12))return new Decimal("1")
            else if (player.NN.points.gte("1e2000")) return new Decimal("1e600")
            else if(hasUpgrade('IP',13)) return player.NN.points.pow(0.3).add(1)
            else if (player.NN.points >=4.6415888e+66) return 1e50
            else if(hasUpgrade('NN',25)) return player.NN.points.pow(0.75).add(1)
            else if (player.NN.points >=1e20) return 1e15
            else if(hasUpgrade('NN',22)) return player.NN.points.pow(0.75).add(1)
            else if (player.NN.points>= 2.1544347e+13) return 1e8
            
            else if (hasUpgrade('NN',21)) return player.NN.points.pow(player.X.points.gte(1)?0.5:0.6).add(1)
           
            else if (player.NN.points>= 3200000) return 400
            else return player.NN.points.pow(0.4).add(1)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        unlocked(){
            return hasUpgrade("NN", 12)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        },
    },
    15: {
        title: "-5",
        description: "Increase the hardcaps for '2', '3', and '4' but nerf them.",
        cost(){
          if(player.X.points.gte(1))return new Decimal(1e9)
          return new Decimal(3141)
        },
        unlocked(){
            return hasUpgrade("NN", 14)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        },
    },
    21: {
        title: "-6",
        description: "Boost '-2' and '-4'.",
        cost(){
          if(player.X.points.gte(1))return new Decimal(3.14e9)
          return new Decimal(3141)
        },
     
        unlocked(){
            return hasUpgrade("NN", 15)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        },
    },
    22: {
        title: "-7",
        description: "Boost '-2' and '-4'.",
        cost: new Decimal(4.20e9),
     
        unlocked(){
            return hasUpgrade("N", 51)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        },
    },
    23: {
        title: "-8",
        description: "Boost '-2'.",
        cost: new Decimal(1e18),
     
        unlocked(){
            return hasUpgrade("NN", 22)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        },
    },
    24: {
        title: "-9",
        description(){
          if(player.X.points.gte(1))return "Remove the second hardcap of '-2'. You can buy this upgrade while you are in Infinity Challenge 1."
          return "Remove the fourth hardcap of '-2'. You can buy this upgrade while you are in Infinity Challenge 1."
        },
        cost(){ 
            if(player.I.activeChallenge!=11)return new Decimal(Infinity);
            if(player.X.points.gte(1))return new Decimal(1e15)
            return new Decimal(3.14e9);
        },
        unlocked(){
            return (hasMilestone('I',6))&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        
        },
        
    },
    25: {
        title: "-10",
        description: "Remove the third hardcap of '-4'. You can buy this upgrade while you are in Infinity Challenge 2.",
        cost(){ 
            if(player.I.activeChallenge!=12)return new Decimal(Infinity);
          if(player.X.points.gte(1))return new Decimal(3.14e50)
            return new Decimal(3.14e9);
        },
        unlocked(){
            return (hasMilestone('I',7))&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
        },
        },
        31: {
            title: "-11",
            description: "Unlock '-3'. You can buy this upgrade while you are in Infinity Challenge 3.",
            cost(){ 
                if(player.I.activeChallenge!=21)return new Decimal(Infinity);
                return new Decimal(3.14e9);
            },
            unlocked(){
                return (hasUpgrade('F',34))&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
            },
            },
            32: {
                title: "-12",
                description: "Raise number gain to 1.25.",
                cost: new Decimal(1e103),
             
                unlocked(){
                    return hasUpgrade("F", 42)
                },
            },
            33: {
                title: "-13",
                description: "Unlock Infinity challenge 5.",
                cost: new Decimal(1e117),
             
                unlocked(){
                    return hasUpgrade("NN", 32)
                },
            },
            34: {
                title: "-14",
                description: "Unlock a number upgrade and remove the hardcap of '-2'.",
                cost: new Decimal(1e177),
             
                unlocked(){
                    return hasUpgrade("NN", 33)&&!inChallenge('NN',11)&&!hasChallenge('NN',11)
                },
            },
},
    milestones: {
        3: {
            requirementDescription: "3 negative numbers",
            effectDescription(){
              if(player.X.points.gte(1))return "The '+', '-', and '/' effects is always at the limit."
              return "Keep master +, -, x, /, '2', '3', '4' and '19' on ALL resets."
            } , 
            done() { return player.NN.points.gte(3)},

        },
        3.14e16: {
            requirementDescription: "3.14e16 negative numbers",
            effectDescription: "Boost negative number gain based on challenge points and autobuy ^.",
            done() { return player.NN.points.gte(3.14e16)&&player.X.points.gte(1) },
          unlocked(){return player.X.points.gte(1)}
        },
        4e21: {
            requirementDescription: "4e21 negative numbers",
            effectDescription: "Unlock the first infinity challenge.",
            done() { return player.NN.points.gte(4e21) }
        },
        1e28: {
            requirementDescription: "1e28 negative numbers",
            effectDescription: "Unlock the third factors buyable.",
            done() { return player.NN.points.gte(1e28)&&player.X.points.lt(1) },
          unlocked(){return player.X.points.lt(1)}
        },
        1e50: {
            requirementDescription: "'-4' effect >= 1e48",
            effectDescription: "Factors are cheaper.",
            done() { return player.NN.points.gte(1e64) }
        },
        1.79e308: {
            requirementDescription: "1.79e308 negative numbers",
            effectDescription: "Unlock a new layer.",
            done() { return player.NN.points.gte(1.79e308) }
        },
    },
    buyables: {
        rows: 2,
        cols: 3,
        11: {
            title: "-+",
            display() {
               return "Multiply negative number gain by " + format(tmp.NN.buyables[11].effect) + ".<br>Cost: " + format(new Decimal("1e20").pow(getBuyableAmount("NN", 11).add(1))) + " Negative numbers"
            },
            unlocked() { return hasUpgrade("IP", 11) },
            canAfford() { 
               return player.NN.points.gte(new Decimal("1e20").pow(getBuyableAmount("NN", 11).add(1))) 
            },
            buy() { 
                {
                   player.NN.points = player.NN.points.minus(new Decimal("1e20").pow(getBuyableAmount("NN", 11).add(1)))
                }
                setBuyableAmount("NN", 11, getBuyableAmount("NN", 11).add(1))
            },
            effect() { 
                if(hasUpgrade('IP',44))  eff = new Decimal("1")
        else  eff = new Decimal("50").pow(getBuyableAmount("NN", 11))   
        return eff
            }
        },
    },
    challenges:{
        11: {
            name: "Negative 2, 3, and 4",
            challengeDescription: "Raise number gain to 0.234 and '2', '3', '4', '-2', '-3', and '-4' is disabled.",
            canComplete(){return player.N.points.gte("1e5790750")},
            goalDescription: "1e5,790,750 numbers",
            rewardDescription(){return "Square number gain but '2', '3', '4', '-2', '-3', and '-4' is disabled and nerf 'Factor Beta'."},
          unlocked(){return hasMilestone('IP',38500)},
        },
        12: {
            name: "Negative UFC",
            challengeDescription: "Raise number gain to 0.123 and FC and UFC effects are disabled (You need to reload to complete FCs after exiting it).",
            canComplete(){return player.N.points.gte("1e4411600")},
            goalDescription: "1e4,411,600 numbers",
            rewardDescription(){return "Square number gain but FC and UFC effects are disabled and nerf 'Factor Beta'."},
          unlocked(){return hasChallenge('NN',11)},
          onEnter(){
            player.F.challenges=[]
            player.UF.challenges=[] }
        },
        21: {
            name: "Negative Buyable",
            challengeDescription: "Raise number gain to 0.012 and row 1 & 2 buyables are disabled.",
            canComplete(){return player.N.points.gte("1e247222")},
            goalDescription: "1e247,222 numbers",
            rewardDescription(){return "Raise number gain to 8 but row 1 & 2 buyables are disabled and nerf 'Factor Beta'."},
          unlocked(){return hasChallenge('NN',12)},
        },
        22: {
            name: "Negative Cheaper",
            challengeDescription: "Raise number gain to 0.023 and Factors and Upgrade Factors are more expensive.",
            canComplete(){return player.N.points.gte("1e4148000")},
            goalDescription: "1e4,148,000 numbers",
            rewardDescription(){return "Factor Shifts boost point gain but Factors and Upgrade Factors are more expensive."},
          unlocked(){return hasChallenge('NN',21)},
          onEnter(){
            player.F.points=new Decimal(0)
            player.UF.points=new Decimal(0) }
        },
        31: {
            name: "Negative Upgrade Factor",
            challengeDescription: "Raise number gain to 0.034 and remove UF.",
            canComplete(){return player.N.points.gte("1e130828282")},
            goalDescription: "1e130,828,282 numbers",
            rewardDescription(){return "Raise number gain to 1.5 and unlock a new feature in UF."},
          unlocked(){return hasUpgrade('IP',66)},
         onEnter(){return player.UF.points=new Decimal(0)},
    },
    32: {
        name: "Negative Negative Numbers",
        challengeDescription: "Raise number gain to 0.0011, remove all features in NN (excluding NN challenges), you can't gain NN, and IP is based on numbers.",
        canComplete(){return player.N.points.gte("e3.333e14")},
        goalDescription: "e3.333e14 numbers",
        rewardDescription(){return "Cube number gain but remove NN (you still have challenge rewards) and unlock a UF upgrade."},
      unlocked(){return hasMilestone('E',5000)},
     onEnter(){player.NN.points=new Decimal(0)
        player.IP.points=new Decimal(0)
        player.I.points=new Decimal(0)},
},

    },
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("I", 4) && resettingLayer=="I") keep.push("milestones")
        if (hasMilestone("I", 4) && resettingLayer=="I") keep.push("upgrades")
        if (hasMilestone("IP", 2) && resettingLayer=="IP") keep.push("upgrades")
        if (hasMilestone("E", 5) && resettingLayer=="E") keep.push("upgrades")
        if(hasMilestone("FO",1) && resettingLayer=="FO")keep.push("upgrades")
        if (hasMilestone("IP", 2) && resettingLayer=="IP") keep.push("milestones")
        if (resettingLayer=="I") keep.push("challenges")
        if (resettingLayer=="IP") keep.push("challenges")
        if (resettingLayer=="FS") keep.push("challenges")
        if (resettingLayer=="MS") keep.push("challenges")
        if (resettingLayer=="E") keep.push("challenges")
        if (resettingLayer=="O") keep.push("challenges")
        if (resettingLayer=="M") keep.push("challenges")
    
            
            if (resettingLayer=="S") keep.push("challenges")
          
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
    tabFormat: {
        "Milestones":{
          content:[
        "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
        "blank",
        "resource-display",
        "blank",
        "blank",
        "milestones",
          ]},
      
      "Upgrades":{
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
          "blank",
          "blank",
          "upgrades",
        ]
      },
      "Buyables":{
        unlocked(){return hasUpgrade('IP',11)&&(!inChallenge("NN", 21)&&!hasChallenge("NN", 21))},
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
          "blank",
          "blank",
          "buyables",
        ]
      },
      "Challenges":{
        unlocked(){return hasMilestone('IP',38500)},
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
          "blank",
          "blank",
          "challenges",
        ]
      },
      },
      layerShown(){return (player.I.best.gte(3)||hasMilestone('E',1))&&(!hasChallenge('NN',32)||hasUpgrade('N',71))},
      passiveGeneration(){return hasMilestone('IP',6)? 1 : 0},
      automateStuff(){
        if(hasUpgrade("IP",21)){
          if(layers.NN.buyables[11].canAfford())setBuyableAmount("NN",11,player.NN.points.log(1e20).floor().add(1))
        
        }
    },
})