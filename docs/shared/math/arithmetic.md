---
title: Arithmetic
description: A collection of arithmetic functions.
demo_link: https://svelte.dev/repl/f365a8bf9052468ba274a253d30fa025?version=3.55.1
---

# {{title}}

{{description}}

## 🎬 Usage

```html
<script>
    import { average, divide, max, min, multiply, subtract, sum } from "@sveu/shared/math"

    const sums = sum(1, 2, 3, 4, "5")

    const divides = divide("30", "2") 

    const subtracts = subtract("50", 10, 20, 5)
    
    const multiplies = multiply(3, 5)

    const averages = average("10", "20")

    const maxed = max(1, 2, 3, 4, 5, 6, "7", 15, 8, 9, 10, 11, 12, 13, 14)

    const minned = min(15, 20, 30, 40, 50, 60, 70, 80, 90, 100)
</script>

<h1>Sum: {sums}</h1>

<h1>Divide: {divides}</h1>

<h1>Subtract: {subtracts}</h1>

<h1>Multiply: {multiplies}</h1>

<h1>Average: {averages}</h1>

<h1>Max: {maxed}</h1>

<h1>Min: {minned}</h1>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **args**            | A sequence of arguments                      | `Sequential`          | Yes      |

### ↩️ Returns

The result of the arithmetic operation.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import { to_number } from "../../to_number"
    import type { Sequential } from "../../utils"

    /**
     * Sums all the numbers in given sequences.
     *
     * @param args - The sequences to sum.
     *
     * @returns The sum of all the numbers in given sequences.
     */
    export function sum(...args: Sequential): number {
        let result = 0

        for (const arg of args) {
            if (Array.isArray(arg)) {
                for (const item of arg) {
                    result += to_number(item)
                }
            } else {
                result += to_number(arg)
            }
        }

        return result
    }

    /**
     * Subtract all the numbers in given sequences.
     *
     * @param args - The sequences to subtract.
     *
     * @returns The subtraction of all the numbers in given sequences.
     */
    export function subtract(...args: Sequential): number {
        let result = 0
        for (const arg of args) {
            if (Array.isArray(arg)) {
                for (const item of arg) {
                    if (result === 0) result = to_number(item)
                    else result -= to_number(item)
                }
            } else {
                if (result === 0) result = to_number(arg)
                else result -= to_number(arg)
            }
        }

        return result
    }

    /**
     * Multiply all the numbers in given sequences.
     *
     * @param args - The sequences to multiply.
     *
     * @returns The multiplication of all the numbers in given sequences.
     */
    export function multiply(...args: Sequential): number {
        let result = 1

        for (const arg of args) {
            if (Array.isArray(arg)) {
                for (const item of arg) {
                    result *= to_number(item)
                }
            } else {
                result *= to_number(arg)
            }
        }

        return result
    }

    /**
     * Divide all the numbers in given sequences.
     *
     * @param args - The sequences to divide.
     *
     * @returns The division of all the numbers in given sequences.
     */
    export function divide(...args: Sequential): number {
        let result

        for (const arg of args) {
            if (Array.isArray(arg)) {
                for (const item of arg) {
                    if (result === undefined) result = to_number(item)
                    else {
                        result /= to_number(item)
                    }
                }
            } else {
                if (result === undefined) result = to_number(arg)
                else result /= to_number(arg)
            }
        }

        if (result === undefined) result = 0
        return result
    }

    /**
     * Calculates the average of all the numbers in given sequences.
     *
     * @param args - The sequences to calculate the average.
     *
     * @returns The average of all the numbers in given sequences.
     */
    export function average(...args: Sequential): number {
        return sum(...args) / args.flat().length
    }

    /**
     * Get the maximum number of sequences
     *
     * @param args - The sequences to get the maximum number.
     *
     * @returns The maximum number of sequences
     */
    export function max(...args: Sequential): number {
        let result = -Infinity

        for (const arg of args) {
            if (Array.isArray(arg)) {
                for (const item of arg) {
                    result = Math.max(result, to_number(item))
                }
            } else {
                result = Math.max(result, to_number(arg))
            }
        }

        return result
    }

    /**
     * Get the minimum number of sequences
     *
     * @param args - The sequences to get the minimum number.
     *
     * @returns The minimum number of sequences
     */
    export function min(...args: Sequential): number {
        let result = Infinity

        for (const arg of args) {
            if (Array.isArray(arg)) {
                for (const item of arg) {
                    result = Math.min(result, to_number(item))
                }
            } else {
                result = Math.min(result, to_number(arg))
            }
        }

        return result
    }
    ```
