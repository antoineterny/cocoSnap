let max = (arr) => Math.max.apply(null, arr)
d.map(x => Number(x.confirmed_cases))
max(d.map(x => Number(x.confirmed_cases)))
