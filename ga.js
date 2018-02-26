function main () {
  const populationSize = 10 // Start with ten individuals
  const problemSize = 10 // Start with a length of 5 strings of 0s and 1s
  const probabilityCrossover = 0.2
  const probabilityMutation = 0.1
  const MAX_EPOCHS = 1000

  const population = (() => {
    const individuals = Array(populationSize).fill(0).map(() => {
      return Array(problemSize).fill(0).map((_) => {
        return Math.round(Math.random())
      }).reduce((l, r) => l + r, '')
    })
    return individuals
  })()

  console.log('population:', population)

  let newPopulation = evaluatePopulation(population)
  let bestSet = getBestSolution(newPopulation)
  let epochs = 0

  while (epochs < MAX_EPOCHS) {
    epochs += 1
    const [parent1, parent2, i, j] = selectParents(newPopulation, problemSize)

    const [child1, child2] = crossover(parent1, parent2, probabilityCrossover)
    const child1Mutated = mutate(child1, probabilityMutation)
    const child2Mutated = mutate(child2, probabilityMutation)

    const newChildren = evaluatePopulation([child1Mutated, child2Mutated])
    if (newChildren[0] === child1Mutated) {
      newPopulation[i] = child1Mutated
    } else {
      newPopulation[j] = child2Mutated
    }
    bestSet = getBestSolution(newPopulation)
    console.log(`epoch ${epochs} = ${newPopulation[0]}`)
    if (bestSet === problemSize) {
      break
    }
  }
}

function calculateFitness (individual) {
  const score = individual.split('').filter(i => i === '1').length
  return [individual, score]
}

function evaluatePopulation (individuals) {
  const individualsFitness = individuals.map(calculateFitness)
  return individualsFitness.sort(([_, score1], [__, score2]) => {
    return score2 > score1
  }).map(([individual, _]) => individual)
}

function getBestSolution (population) {
  const fittest = population[0]
  const [_, score] = calculateFitness(fittest)
  return score
}

function selectParents (population, problemSize) {
  const i = 0
  let j = Math.floor(Math.random() * problemSize)
  while (j === i) {
    j = Math.floor(Math.random() * problemSize)
  }
  const parent1 = population[i]
  const parent2 = population[j]
  return [parent1, parent2, i, j]
}

function crossover (parent1, parent2, probabilityCrossover) {
  if (Math.random() > probabilityCrossover) {
    const crossoverIndex = Math.floor(Math.random() * parent1.length)
    const parent1Head = parent1.slice(0, crossoverIndex)
    const parent1Tail = parent1.slice(crossoverIndex, parent1.length)
    const parent2Head = parent2.slice(0, crossoverIndex)
    const parent2Tail = parent2.slice(crossoverIndex, parent1.length)

    const child1 = [...parent1Head, ...parent2Tail].join('')
    const child2 = [...parent2Head, ...parent1Tail].join('')
    return [child1, child2]
  } else {
    return [parent1, parent2]
  }
}

function mutate (child, probabilityMutation) {
  if (Math.random() > probabilityMutation) {
    const mutationIndex = Math.floor(Math.random() * child.length)
    child[mutationIndex] = child[mutationIndex] === '0' ? '1' : '0'
  }
  return child
}

main()
