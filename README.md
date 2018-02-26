# Genetic Algorithm
Genetic algorithm implemented in various languages and applications in various fields


## What is genetic algorithm

References [here](https://towardsdatascience.com/introduction-to-genetic-algorithms-including-example-code-e396e98d8bf3) and [here](http://www.cleveralgorithms.com/nature-inspired/evolution/genetic_algorithm.html).

## Pseudo Code

The five phases of genetic algorithm are:

1. Initial population
2. Fitness function
3. Selection
4. Crossover
5. Mutation

This can be represented as the following pseudo code:

```
Input: Population Size, Problem Size, Probability Crossover, Probability Mutation
Output: Best Set

# 1
Population = InitializePopulation(Population Size, Problem Size)

# 2 
EvaluatePopulation(Population)

Best Set = GetBestSolution(population)

while (StopCondition())
  # 3
  Parents = SelectParents(Population, Population Size)
  
  Children = Theta
  
  For (Parent 1, Parent 2 from Parents)
    # 4
    Child 1, Child 2 = Crossover(Parent1, Parent2, Probability Crossover)
    
    # 5
    Children = Mutate(Child 1, Probability Mutation)
    Children = Mutate(Child 2, Probability Mutation)
  End
  
  EvaluatePopulation(Children)
  
  Best Set = GetBestSolution(Children)
  
  Population = Replace(Population, Children)
End

Return Best Set
```
