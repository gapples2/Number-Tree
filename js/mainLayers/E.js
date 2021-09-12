addLayer("E", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0), 
        Npower: new Decimal(1),     
        Ppower: new Decimal(1),    
        NNpower: new Decimal(1),   
        IPpower: new Decimal(1),  
        no234: new Decimal(1),    
        CP: new Decimal(0),  
        CPget: new Decimal(0), 
        CPget2: new Decimal(0),     
        base11: new Decimal(1),    
        resetgain:new Decimal(0),
        CPgettest:new Decimal(0),
        Nafterpow:new Decimal(0),
        meta:new Decimal(0),
    }},
    position: -1,  
    canReset(){if(hasMilestone('E',22))  return player.N.points.gte("e9e15")
        else return inChallenge('I',62)&&player.N.points.gte("e9e15")},

    color: "#80ff80",                       // The color for this layer, which affects many elements.
    resource: "Eternity points",            // The name of this layer's main prestige resource.
    resource(){return "Eternity points"}, 
    row: 3,                                 // The row this layer is on (0 is the first row).

    baseResource: "Numbers",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.N.points },  // A function to return the current amount of baseResource.

    requires: function(){

		return new Decimal("e9e15");
	},            
    prestigeButtonText() { 
        return "Reset for <b>" + formatWhole(tmp[this.layer].resetGain) + "</b> Eternity points" 
    

    },                                    
    type: "custom",                         
    exponent: 1,     
    hotkeys: [
        {key: "e", description: "E: Reset for Eternity points", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.E.unlocked) doReset("E") },
        unlocked() {return hasMilestone('E', 1)} // Determines if you can use the hotkey, optional
    },
    ],
    getResetGain() {
      
     
        if(!player.N.points.gte("e9e15")) return 0
        else if(!player.N.points.gte("ee16")&&player.N.points.gte("e9e15")) return 1
        if(hasUpgrade('MS',83)) return 0
      else   if(hasMilestone('E',1e41)) return formatWhole((player.N.points.add(1).log(10).add(1).log(10).minus(15).pow(6)).times(player.E.CP.add(1).pow(player.E.boost)).times(5).times(upgradeEffect('E',14)).times(player.O.points.pow(3)).pow(1.25))
        else if(hasMilestone('O',9)) return formatWhole((player.N.points.add(1).log(10).add(1).log(10).minus(15).pow(6)).times(player.E.CP.add(1).pow(player.E.boost)).times(5).times(upgradeEffect('E',14)).times(player.O.points.pow(3)))
        else if(hasMilestone('E',1e11)) return formatWhole((player.N.points.add(1).log(10).add(1).log(10).minus(15).pow(6)).times(player.E.CP.add(1).pow(player.E.boost)).times(5).times(upgradeEffect('E',14)))
        else if(hasUpgrade('E',12)&&hasUpgrade('E',14)) return formatWhole(player.N.points.add(1).log(10).add(1).log(10).minus(15).times(player.E.CP.add(1).pow(player.E.boost)).times(5).times(upgradeEffect('E',14)))
        else if(hasUpgrade('E',14))  return formatWhole(player.N.points.add(1).log(10).add(1).log(10).minus(15).times(player.E.CP.add(1).pow(player.E.boost)).times(upgradeEffect('E',14)))
        else if(hasUpgrade('E',12))  return formatWhole(player.N.points.add(1).log(10).add(1).log(10).minus(15).times(player.E.CP.add(1).pow(player.E.boost)).times(5))
        else return formatWhole(player.N.points.add(1).log(10).add(1).log(10).minus(15).times(player.E.CP.add(1).pow(player.E.boost)))
        

     
    },
    getNextAt: function(){
        if(!player.N.points.gte("e9e15")) return "e9.000e15"
        return "e" + Decimal.pow(10, new Decimal(tmp[this.layer].resetGain).add(16))
	},

    doReset(resettingLayer) {
        let keep = [];
    
        
        if (resettingLayer=="S") keep.push("milestones")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
    milestones:{
        1: {
            requirementDescription: "1 EP",
            effectDescription: "Keep IP, I, F, and UF milestones and Infinity & negative number challenges on reset. Raise number gain to 1.2.",
            done() { return player.E.points.gte(1) }
        },
        3: {
            requirementDescription: "3 EP",
            effectDescription: "Keep IP upgrades on reset.",
            done() { return player.E.points.gte(3) }
        },
        5: {
            requirementDescription: "5 EP",
            effectDescription: "Keep negative number upgrades and IP challenges on reset.",
            done() { return player.E.points.gte(5) }
        },
        8: {
            requirementDescription: "8 EP",
            effectDescription: "Keep Upgrade Factor upgrades on reset.",
            done() { return player.E.points.gte(8) }
        },
        12: {
            requirementDescription: "12 EP",
            effectDescription: "Unlock a new challenge and EP boosts number gain.",
            done() { return player.E.points.gte(12) }
        },
        21: {
            requirementDescription: "1 Challenge points",
            effectDescription: "Challenge points boost EP gain.",
            done() { return player.E.CP.gte(1) }
        },
        22: {
            requirementDescription: "100 EP",
            effectDescription: "You can do an Eternity reset without being in Boost or Nerf 4.",
            done() { return player.E.points.gte(100) }
        },
 300: {
            requirementDescription: "300 EP",
            effectDescription: "EP boosts number gain.",
            done() { return player.E.points.gte(300) }
        },
        600: {
            requirementDescription: "600 EP",
            effectDescription: "Unlock a new option in the challenge selector.",
            done() { return player.E.points.gte(600) }
        },
        603: {
            requirementDescription: "3 Challenge points",
            effectDescription: "You can buy the max amount of Factors possible.",
            done() { return player.E.CP.gte(3) },
        },
        5000: {
            requirementDescription: "5000 EP",
            effectDescription: "Unlock a new negative number chalenge.",
            done() { return player.E.points.gte(5000) },
        },
        5007: {
            requirementDescription: "7 Challenge points",
            effectDescription: "Unlock 5 eternity upgrades but you only can buy Challenge points^0.5 upgrade.",
            done() { return player.E.CP.gte(7) },
        },
        5010: {
            requirementDescription: "10 Challenge points",
            effectDescription: "You can complete the eternity challenge without in Boost or Nerf 4.",
            done() { return player.E.CP.gte(10) },
        },
        500000: {
            requirementDescription: "500000 EP",
            effectDescription: "Raise number gain to 1.2 if you are in an eternity challenge.",
            done() { return player.E.points.gte(500000) },
        },
      
        1000000: {
            requirementDescription: "1e6 EP",
            effectDescription: "Factors boost number gain and unlock 2 new upgrades.",
            done() { return player.E.points.gte(1e6) },
        },
        2e7: {
            requirementDescription: "2e7 EP",
            effectDescription: "Boost the UF buyable and the UF buyable is cheaper based on your EP.",
            done() { return player.E.points.gte(2e7) },
        },
        1e11: {
            requirementDescription: "1e11 EP",
            effectDescription: "You can get more EP and Factors are cheaper.",
            done() { return player.E.points.gte(1e11) },
        },
        1e15: {
            requirementDescription: "1e15 EP",
            effectDescription: "Unlock 2 layers.",
            done() { return player.E.points.gte(1e15) },
        },
        1e24: {
            requirementDescription: "1e24 EP",
            effectDescription: "Boost '9' and '10'.",
            done() { return player.E.points.gte(1e24) },
        },
        5e25: {
            requirementDescription: "5e25 EP",
            effectDescription: "Raise number gain to 1.5 if you are not in an eternity challenge and gain 1,000% of EP on reset per second.",
            done() { return player.E.points.gte(5e25) },
        },
        1e27: {
            requirementDescription: "1e27 EP",
            effectDescription: "Unlock a Mathematician challenge.",
            done() { return player.E.points.gte(1e27) },
        },
        1e31: {
            requirementDescription: "1e31 EP",
            effectDescription: "Remove the first effect in the eleventh IP milestone, auto buy Infinity, and Infinity resets nothing.",
            done() { return player.E.points.gte(1e31) },
        },
        1e40: {
            requirementDescription: "1e40 EP",
            effectDescription: "The first challenge option is easier based on EP. ",
            done() { return player.E.points.gte(1e40) },
        },
        1e41: {
            requirementDescription: "5667 Challenge points",
            effectDescription: "Raise EP gain to 1.25. ",
            done() { return player.E.CP.gte(5667) },
        },
        1e52: {
            requirementDescription: "1e52 EP",
            effectDescription: "Boost '9' and '0' from UF and unlock a new UF upgrade. ",
            done() { return player.E.points.gte(1e52) },
        },
        1e70: {
            requirementDescription: "1e70 EP",
            effectDescription: "Raise number gain to 1.05. ",
            done() { return player.E.points.gte(1e70) },
        },
        1e71: {
            requirementDescription: "57777 Challenge points",
            effectDescription: "Boost the fifth eternity milestone's second effect.",
            done() { return player.E.CP.gte(57777) },
        },
        1e144: {
            requirementDescription: "1e144 EP",
            effectDescription: "Gain 1,000% of Ordinal on reset per second. ",
            done() { return player.E.points.gte(1e144) },
        },
        1e284: {
            requirementDescription: "1e278 EP",
            effectDescription: "Factors are cheaper. ",
            done() { return player.E.points.gte(1e278) },
        },

  1e285: {
            requirementDescription: "1e575 EP",
            effectDescription: "Unlock galaxy and you can buy max MS.",
            done() { return player.E.points.gte("1e575") },
        },
        1e286: {
            requirementDescription: "1e654 EP",
            effectDescription: "Unlock a challenge.",
            done() { return player.E.points.gte("1e654") },
        },
        1e287: {
            requirementDescription: "1e1555 EP",
            effectDescription: "'9' and '0' boosts number and point gain and remove the cap of 'Galaxy'.",
            done() { return player.E.points.gte("1e1555") },
        },
    },
    challenges:{
        11:{
            name: "Choose",
        challengeDescription(){
          let desc = "You can choose the nerfs."
          desc+="\nRaise number gain to "+format(player.E.Npower.times(hasMilestone('E',500000)?1.2:1))+"."
          if(hasMilestone('E',600)&&!hasMilestone('MS',4000)&&player.E.NNpower)desc+="\nYou can't gain NN."
          if(hasUpgrade('UF',31)&&!hasMilestone('MS',4000)&&player.E.IPpower)desc+="\nYou can't gain IP."
          return desc
        },
        canComplete(){
            if(hasMilestone('E',5010))  return player.N.points.gte(1e1000)
        else return player.N.points.gte(1e1000)&&inChallenge('I',62)
           },
        goalDescription(){ 
            if(hasMilestone('E',5010))  return "e9e15 Number"
            else return "e9e15 Number while you are in Boost or nerf 4."},
        rewardDescription(){ 
    return "Gain "+format(player.E.CPget2.minus(player.E.CP).max(0))+" challenge points."

        },
        onExit(){
            if(player.N.points.gte("e9e15")&&player.E.CPget2.gte(player.E.CP)&&inChallenge('I',62)) player.E.CP=player.E.CPget2
            else if (player.N.points.gte("e9e15")&&player.E.CPget2.gte(player.E.CP)&&hasMilestone('E',5010)) player.E.CP=player.E.CPget2
        },
      unlocked(){return hasMilestone('E',12)&&!hasMilestone('MS',4000)},
    },
    21:{
        name: "Galaxy Challenge 1",
    challengeDescription(){ return"Raise number gain to (1/Number^0.5)"},
    canComplete(){
        return player.N.points.gte("e6.25e59")
       },
    goalDescription(){ 
        return "e6.25e59 Number"
     },
    rewardDescription(){ 
return "MS are cheaper."

    },

   
  unlocked(){return hasMilestone('E',1e286)},
},
22:{
    name: "Galaxy Challenge 2",
challengeDescription(){ return"Raise number gain to 1e-50."},
canComplete(){
    return player.N.points.gte("e4.5e35")
   },
goalDescription(){ 
    return "e4.5e35 Number"
 },
rewardDescription(){ 
return "You can do ω 20 times."

},


unlocked(){return hasMilestone('E',1e286)},
},
31:{
    name: "Galaxy Challenge 3",
challengeDescription(){ return"You can't gain any resources from row 2 & 3 layers."},
canComplete(){
    return player.N.points.gte("ee103")
   },
goalDescription(){ 
    return "ee103 Number"
 },
rewardDescription(){ 
return "Ordinal's effect is much better and ordinal boosts point gain."

},


unlocked(){return hasMilestone('E',1e286)},
}


    },
    clickables:{

            11:{
                display() {
                  let exp = 0.5
                  if(hasUpgrade('UF',92))exp=0.7
                  if(hasMilestone('E',1e40))exp=formatWhole(player.E.base11)
                  return "Raise number gain to "+exp+" per click. Currently: ^"+format(player.E.Npower)
                },

                canClick(){return (!inChallenge('E',11))},
                onClick(){
                  let exp = 0.5
                  if(hasUpgrade('UF',92))exp=0.7
                  if(hasMilestone('E',1e40))exp=player.E.base11
                  player.E.Npower = player.E.Npower.times(exp)
                player.E.CPget = player.E.CPget.add(1)},
                unlocked(){return !hasMilestone('MS',4000)},
                },
               
              
                    13:{
                        display() {return "You can't gain NN."},
        unlocked(){return hasMilestone('E',600)&&!hasMilestone('MS',4000)},
                        canClick(){return (!inChallenge('E',11)&&(player.E.NNpower.gte(1)))},
                        onClick(){player.E.NNpower = player.E.NNpower.times(0)
                            player.E.CPget = player.E.CPget.add(2)},
                    style(){return {"background-color":player.E.NNpower.gte(1)?"#00ff00":"#ff0000"}}
                        },
                        14:{
                            display() {return "You can't gain IP."},
            unlocked(){return hasUpgrade('UF',31)&&!hasMilestone('MS',4000)},
                            canClick(){return (!inChallenge('E',11)&&(player.E.IPpower.gte(1)))},
                            onClick(){player.E.IPpower = player.E.IPpower.times(0)
                                player.E.CPget = player.E.CPget.add(2)},
                          style(){return {"background-color":player.E.IPpower.gte(1)?"#00ff00":"#ff0000"}}
                            },
                     
                        
                41:{
                    display() {return "Clear option data."},
                    unlocked(){return !hasMilestone('MS',4000)},
                    canClick(){return true},
                    onClick(){
                        player.E.Npower = new Decimal(1)
                        player.E.Ppower = new Decimal(1)
                        player.E.NNpower = new Decimal(1)
                        player.E.IPpower = new Decimal(1)
                 
                        player.E.CPget = new Decimal(0)
                    }
                    },
             
                        51:{
                            display() {return "Reset E upgrades."},
                         
                            canClick(){return true},
                            onClick(){
                                player.E.upgrades = []
                            }
                            },
                            61:{
                                display() {return "GO META"},
                             
                                canClick(){return true},
                                onClick(){
                                    player.E.upgrades = []
                                    player.E.challenges = []
                            player.E.meta=new  Decimal(1)
                            player.E.points=new  Decimal(0)
                                },
                                style() { return {
                                    "font-size": "24px",
                                    "height": "600px",
                                    "width": "800px"
                                    }
                                },
                            }
         

    },
    buyables: {

        11: {
            title: "Tickspeed",
            display() {
                if(getBuyableAmount("E", 11).gte(45)) return "Game speed is " + format(tmp.E.buyables[11].effect) + "x faster.<br>Cost : " + format(new Decimal(1e40).pow((getBuyableAmount("E", 11).add(1)).pow(1.1))) + " Eternity points"
               else if(getBuyableAmount("E", 11).gte(20))  return "Game speed is " + format(tmp.E.buyables[11].effect) + "x faster.<br>Cost : " + format(new Decimal(1e40).pow(getBuyableAmount("E", 11).add(1)).pow(1.2)) + " Eternity points"
             else  return "Game speed is " + format(tmp.E.buyables[11].effect) + "x faster.<br>Cost : " + format(new Decimal(1e40).pow(getBuyableAmount("E", 11).add(1))) + " Eternity points"
            },
            unlocked() { return hasUpgrade("UF", 43) },
            canAfford() { 
                if(getBuyableAmount("E", 11).gte(45)) return player.E.points.gte(new Decimal(1e40).pow((getBuyableAmount("E", 11).add(1)).pow(1.1))) 
                else if(getBuyableAmount("E", 11).gte(20))   return player.E.points.gte(new Decimal(1e40).pow(getBuyableAmount("E", 11).add(1)).pow(1.2)) 
               else return player.E.points.gte(new Decimal(1e40).pow(getBuyableAmount("E", 11).add(1))) 
            },
            buy() { 
                {
                    if(getBuyableAmount("E", 11).gte(45))   player.E.points = player.E.points.minus(new Decimal(1e40).pow((getBuyableAmount("E", 11).add(1)).pow(1.1)))
                 else   if(getBuyableAmount("E", 11).gte(20))  player.E.points = player.E.points.minus(new Decimal(1e40).pow(getBuyableAmount("E", 11).add(1)).pow(1.2))
               else    player.E.points = player.E.points.minus(new Decimal(1e40).pow(getBuyableAmount("E", 11).add(1)))
                }
                setBuyableAmount("E", 11, getBuyableAmount("E", 11).add(1))
            },
            effect() { 
    if(hasMilestone('O',277)) eff = new Decimal(buyableEffect('E',12).times(1.7)).pow(getBuyableAmount("E", 11))
             else   eff = new Decimal(buyableEffect('E',12).times(1.4)).pow(getBuyableAmount("E", 11))
     
              
                return  eff
           
                
               
                
            }
        },
        12: {
            title: "Galaxy",
            display() {

                if(getBuyableAmount("E", 12).gte(20))  return "Raise 'Tickspeed' effect by " + format(tmp.E.buyables[12].effect) + ".<br>Cost : " + format(new Decimal(3).pow(getBuyableAmount("E", 12).add(1).times(0.75).pow(0.91))) + " Mathematics Symbol"
               else return "Raise 'Tickspeed' effect by " + format(tmp.E.buyables[12].effect) + ".<br>Cost : " + format(new Decimal(3).pow(getBuyableAmount("E", 12).add(1).times(0.7).pow(0.9))) + " Mathematics Symbol"
            },
            unlocked() { return hasMilestone("E", 1e285) },
            canAfford() { 
                if(getBuyableAmount("E", 12).gte(20))  return player.MS.points.gte(new Decimal(3).pow(getBuyableAmount("E", 12).add(1).times(0.75).pow(0.91))) 
               else return player.MS.points.gte(new Decimal(3).pow(getBuyableAmount("E", 12).add(1).times(0.7).pow(0.9))) 
            },
            buy() { 
                {  if(getBuyableAmount("E", 12).gte(20)) player.MS.points = player.MS.points.minus(new Decimal(3).pow(getBuyableAmount("E", 12).add(1).times(0.75).pow(0.91)))
                  else player.MS.points = player.MS.points.minus(new Decimal(3).pow(getBuyableAmount("E", 12).add(1).times(0.7).pow(0.9)))
                }
                setBuyableAmount("E", 12, getBuyableAmount("E", 12).add(1))
            },
            effect() { 
                if(eff>=420) eff = new Decimal("420")
            else if(eff>=10&&!hasMilestone('E',1e287))   eff = new Decimal("10")
           else eff = new Decimal("1.101").pow(getBuyableAmount("E", 12))
     
              
                return  eff = eff
           
                
               
                
            }
        },
    },
    update(diff){
    
        if(hasMilestone('E',1e40)) player.E.base11 = player.E.points.add(1).log(10).add(1).log(10).add(1).log(10).add(0.35)

        if(hasMilestone('O',100)&&hasChallenge('M',11)) player.E.CPget2= player.E.CPget.times(player.E.points.add(1).log(10).add(1).pow(0.3)).times(player.UF.mp.add(1).log(10).add(1).log(10).add(1)).times(player.O.points.add(1).log(10).add(1).pow(1.25))
       else  if(hasChallenge('M',11)) player.E.CPget2= player.E.CPget.times(player.E.points.add(1).log(10).add(1).pow(0.3)).times(player.UF.mp.add(1).log(10).add(1).log(10).add(1))
       else if(hasUpgrade('UF',91)) player.E.CPget2= player.E.CPget.times(player.E.points.add(1).log(10).add(1).pow(0.3))
       else  player.E.CPget2= player.E.CPget
       if(hasUpgrade('MS',83))  player.E.points = new  Decimal(0)
      else if(hasMilestone('O',369)&&player.N.points.gte("e9e15"))  player.E.points = player.E.points.plus((player.N.points.log(10).log(10).minus(15).pow(6)).times(player.E.CP.add(1).pow(player.E.boost)).times(5).times(upgradeEffect('E',14)).times(player.O.points.pow(3)).times(diff).times(1000).pow(1.25).times(100000000))
       else if(hasMilestone('E',1e41)&&player.N.points.gte("e9e15")) player.E.points = player.E.points.plus((player.N.points.log(10).log(10).minus(15).pow(6)).times(player.E.CP.add(1).pow(player.E.boost)).times(5).times(upgradeEffect('E',14)).times(player.O.points.pow(3)).times(diff).times(1000).pow(1.25))
       else if(hasMilestone('MS',600)&&player.N.points.gte("e9e15")) player.E.points = player.E.points.plus((player.N.points.log(10).log(10).minus(15).pow(6)).times(player.E.CP.add(1).pow(player.E.boost)).times(5).times(upgradeEffect('E',14)).times(player.O.points.pow(3)).times(diff).times(1000))
        else if(hasMilestone('E',5e25)&&player.N.points.gte("e9e15")) player.E.points = player.E.points.plus((player.N.points.log(10).log(10).minus(15).pow(6)).times(player.E.CP.add(1).pow(player.E.boost)).times(5).times(upgradeEffect('E',14)).times(player.O.points.pow(3)).times(diff).times(10))
      if(challengeCompletions('O',11)>0) player.E.boost = new Decimal(8).add(challengeCompletions('O',11)).add(challengeCompletions('O',11))
        else if(hasUpgrade('MS',33)) player.E.boost = 8
        else if(hasMilestone('UF',1e25)) player.E.boost = 6
        else if(hasMilestone('UF',5100)) player.E.boost = 4
          else player.E.boost = 2
          if(hasUpgrade('UF',95)&&challengeCompletions('UF',21)>2)  player.E.CPgettest= player.N.points.add(1).log(2).add(1).log(2).add(1).times(player.E.points.add(1).log(9).add(1).pow(0.35)).times(player.UF.mp.add(1).log(8).add(1).log(8).add(1)).times(player.O.points.add(1).log(10).add(1).pow(1.5).times(tmp.O.effect.pow(2)))
          else if(hasUpgrade('UF',95))  player.E.CPgettest= player.N.points.add(1).log(2).add(1).log(2).add(1).times(player.E.points.add(1).log(9).add(1).pow(0.35)).times(player.UF.mp.add(1).log(8).add(1).log(8).add(1)).times(player.O.points.add(1).log(10).add(1).pow(1.5).times(tmp.O.effect))
  else if(hasMilestone('MS',4000)) player.E.CPgettest= player.N.points.add(1).log(2).add(1).log(2).add(1).times(player.E.points.add(1).log(9).add(1).pow(0.35)).times(player.UF.mp.add(1).log(8).add(1).log(8).add(1)).times(player.O.points.add(1).log(10).add(1).pow(1.5))
  if(hasMilestone('MS',4000)) player.E.CP = player.E.CPgettest
      },

    upgrades: {
        canAfford(){
            return new Decimal(player.E.upgrades.length).lt(player.E.CP.pow(0.5).minus(1))
            },
        11: {
            title: "1",
            description: "Raise number gain to 2.",
            cost: new Decimal("0"),
            canAfford(){
               if(!hasMilestone('UF',1e25)) return new Decimal(player.E.upgrades.length).lt(player.E.CP.pow(0.5).minus(0.99))
                },          unlocked(){return !player.E.meta.gte(1)}

        
        },
        12: {
            title: "2",
            description: "Gain 5x more EP.",
            cost: new Decimal("0"),
      
            canAfford(){
                if(!hasMilestone('UF',1e25)) return new Decimal(player.E.upgrades.length).lt(player.E.CP.pow(0.5).minus(0.99))
                },          unlocked(){return !player.E.meta.gte(1)}

        },
        13: {
            title: "3",
            description: "Boost '9' and '0'.",
            cost: new Decimal("0"),
            canAfford(){
                if(!hasMilestone('UF',1e25)) return new Decimal(player.E.upgrades.length).lt(player.E.CP.pow(0.5).minus(0.99))
                },          unlocked(){return !player.E.meta.gte(1)}
},         

        14: {
            title: "4",
            description: "EP boosts itself.",
            cost: new Decimal("0"),
            effect(){return player.E.points.add(1).log(10).add(1).log(10).add(1).pow(2)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            canAfford(){
                if(!hasMilestone('UF',1e25))  return new Decimal(player.E.upgrades.length).lt(player.E.CP.pow(0.5).minus(0.99))
                },          unlocked(){return !player.E.meta.gte(1)}
        },
      
        15: {
            title: "5",
            description: "Raise point gain to 2.",
            cost: new Decimal("0"),
            canAfford(){
                if(!hasMilestone('UF',1e25))  return new Decimal(player.E.upgrades.length).lt(player.E.CP.pow(0.5).minus(0.99))
                },
                unlocked(){return !player.E.meta.gte(1)}
          
   
        },
        21: {
            title: "God",
            description: "Tetrate number gain by 1.01.",
            cost: new Decimal("0"),
          unlocked(){return player.E.meta.gte(1)}
          
   
        },
        22: {
            title: "True Math",
            description: "Remove UF, IP and FS but increase 'God' effect by 0.01.",
            cost: new Decimal("e9e15"),
          unlocked(){return player.E.meta.gte(1)},
         onPurchase(){
             player.IP.points=new Decimal(0)
             player.MS.points=new Decimal(0)
             player.UF.points=new Decimal(0)
             player.FS.points=new Decimal(0)
        }
   
        },
        23: {
            title: "True Inflate",
            description: "Unlock 3 tabs in MS.",
            cost: new Decimal("ee30"),
          unlocked(){return player.E.meta.gte(1)},
      
   
        },
    },
   
    layerShown() { return ((hasChallenge('I',62))||hasMilestone('E',1)) &&!hasUpgrade('MS',83)},          // Returns a bool for if this layer's node should be visible in the tree.
    branches:["I"],
    tabFormat: {
        "Milestones": {
            content: [
            
                    "main-display",
                    "blank",
                  ["prestige-button",function(){return ""}],
                  "blank",
                  "resource-display",
                    "blank",
                    "blank",
                ["display-text",function(){
                    let s=""
                   
                 
                    if(!hasMilestone('E',22)) s+="You can reset while you are in Boost or Nerf 4.<br>"
                    if(hasMilestone('E',5e25)&&!hasMilestone('MS',600)&&!hasMilestone('E',1e41))s+="You are gaining "+ formatWhole(player.N.points.log(10).log(10).minus(15).pow(6).times(player.E.CP.add(1).pow(player.E.boost)).times(5).times(upgradeEffect('E',14)).times(player.O.points.pow(3)).times(10))+" EP/sec<br>"
                    else if(hasMilestone('MS',600)&&!hasMilestone('E',1e41)) s+="You are gaining "+ formatWhole(player.N.points.log(10).log(10).minus(15).pow(6).times(player.E.CP.add(1).pow(player.E.boost)).times(5).times(upgradeEffect('E',14)).times(player.O.points.pow(3)).times(1000))+" EP/sec<br>"
                    else if(hasMilestone('E',1e41)) s+="You are gaining "+ formatWhole(player.N.points.log(10).log(10).minus(15).pow(6).times(player.E.CP.add(1).pow(player.E.boost)).times(5).times(upgradeEffect('E',14)).times(player.O.points.pow(3)).times(1000).pow(1.25))+" EP/sec<br>"
                    return s
                  }],
                "milestones"
            ]
        },
        "Challenges": {
            unlocked(){return (!player.E.meta.gte(1))},
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "challenges",
               ["row",[ ["clickable",11], ["clickable",12], ["clickable",13], ["clickable",14],["clickable",15],["clickable",16],["clickable",17],]],
                ["row",[ ["clickable",41], ["clickable",42]]],
            ["display-text",function(){
                let s=""
             
                s+="You will get "+format(player.E.CPget2)+" challenge points.<br>"
                s+="You have "+format(player.E.CP)+" challenge points.<br>"

                return s
              }],

            ]
        },
        "Upgrades": {
            unlocked(){return (hasMilestone('E',5007)&&!player.E.meta.gte(1))},
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "upgrades",
                ["clickable",51],
            ]
        },
        "Tickspeed": {
            unlocked(){return (hasUpgrade('UF',43)&&!player.E.meta.gte(1))},
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "buyables",
          
            ]
        },
        "Meta": {
            unlocked(){return (player.IP.points.add(1).log(10).add(1).log(10).add(1).times(player.M.points.add(1).pow(5)).times(player.F.points.add(1).log(10).add(1).log(10).add(1)).times(player.MS.points.add(1).pow(0.5)).times(buyableEffect('E',11)).pow(1.01).gte("1.8e308")&&!player.E.meta.gte(1))},
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["clickable",61],
          
            ]
        },
        "meta": {
            unlocked(){return (player.E.meta.gte(1))},
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["row",[  ["upgrade",21], ["upgrade",22], ["upgrade",23]]]
          
            ]
        },
    },


})