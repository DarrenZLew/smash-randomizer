import data from './smashUpData.json';

export function fetchSmashUpData() {
  let selectedFactionsArr = data.sets.map(function(set) {
    return (
      set.factions.map(function(faction) {
        return (
          faction.title
        )
      })
    )
  });
  selectedFactionsArr = [].concat.apply([],selectedFactionsArr);
  let selectedFactionsObj = selectedFactionsArr.reduce(function(acc, curr, index) {
    acc[curr] = curr
    return acc
  },{})

	return {sets: data.sets, selectFacArr: selectedFactionsArr, selectFacObj: selectedFactionsObj}
}