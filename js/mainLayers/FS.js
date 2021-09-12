addLayer("FS", {
    name: "Factor Shift", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "FS", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#966400",
    requires(){
      if(player.X.points.gte(1))return new Decimal(6250)
      return new Decimal(100000000)
    }, // Can be a function that takes requirement increases into account
    resource(){return "Factor Shift"}, 
    baseResource: "Factors", // Name of resource prestige is based on
    baseAmount() {return player.F.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base(){
        if(inChallenge('E',31)||hasUpgrade('E',22))return new Decimal("eeeeeeeeee10")
       else return 1000},
    exponent(){
        if(player.FS.points>=4) return 2.5
        else if(player.FS.points>=3) return 1.5
        else return 1
    },
    branches:["F"],
     // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let mult=new Decimal(1) 
        if (hasUpgrade('F',51)) mult = mult.times(2)
        return mult
    },
    resetsNothing(){
        return hasMilestone('MS',1);
    },autoPrestige(){
        return hasMilestone('MS',40);
    },
    hotkeys: [
        {key: "F", description: "Shift + F: Reset for Factor Shift", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.FS.unlocked) doReset("FS") },
        unlocked() {return hasMilestone('I', 1)} // Determines if you can use the hotkey, optional
    },
    ],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    milestones: {
        1: {
            requirementDescription: "1 Factor Shift",
            effectDescription: "Factor Shifts make Factors cheaper.",
            done() { return player.FS.points.gte(1) }
        },
    },
    layerShown(){return (hasMilestone('NN',1e50)||hasMilestone('IP',1)||hasMilestone('FS',1))&&!hasUpgrade('E',22)}
})