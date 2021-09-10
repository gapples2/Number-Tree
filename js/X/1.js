addLayer("FO", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},
  
    name: "Formula",
    color: "#a7bf89",                       // The color for this layer, which affects many elements.
    resource: "Formulas",            // The name of this layer's main prestige resource.
    row: 3,                                 // The row this layer is on (0 is the first row).
    position: 5,

    baseResource: "factors",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.F.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(17555),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 5,                          // "normal" prestige gain is (currency^exponent).
    base: 100,
    roundUpCost: true,

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return player.X.points.gte(1)&&player.F.points.gte(15000)||player.FO.unlocked },          // Returns a bool for if this layer's node should be visible in the tree.

    branches: ["F"],
  
  formulas:{
    data:[
      {
        formulaName: "f(x)",
        display: "f(x) = x^0.02+1",
        f(x=player.points){
          return x.pow(0.02).add(1)
        },
        use(){return player.points},
        useDisplay: "points",
        effect: "boosts point gain."
      }
    ],
    display(){
      let s="Formulas: "
      if(player.FO.points.eq(0))return s+"none"
      s+="<br>"
      for(let x=0;x<player.FO.points.toNumber();x++){
        s+=run(layers.FO.formulas.data[x].display)+"<br>"
      }
      return s
    },
    effects(){
      let s="Effects: "
      if(player.FO.points.eq(0))return s+"none"
      s+="<br>"
      for(let x=0;x<player.FO.points.toNumber();x++){
        s+=run(layers.FO.formulas.data[x].formulaName)+" "+run(layers.FO.formulas.data[x].effect)+"<br>"+run(layers.FO.formulas.data[x].formulaName).replace("x",run(layers.FO.formulas.data[x].useDisplay))+" = "+format(layers.FO.formulas.data[x].f(run(layers.FO.formulas.data[x].use)))
      }
      return s
    }
  },
  tabFormat:{
    "Main":{
      content:[
        "main-display",
        "prestige-button",
        "resource-display",
        "blank",
        "milestones"
      ]
    },
    "Formulas":{
      content:[
        "main-display",
        "prestige-button",
        "resource-display",
        ["display-text",function(){return tmp.FO.formulas.display()}],
        "blank",
        ["display-text",function(){return layers.FO.formulas.effects()}],
      ]
    }
  },
  milestones: {
    1: {
      requirementDescription: "1 Formula",
      effectDescription: "Keep Number, Factor, and NN upgrades and UF milestones and challenges on reset.",
      done() { return player.FO.points.gte(1) }
    }
  }
})