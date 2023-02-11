---
title: Strftime
description: Formats a date for a given format string code
demo_link: https://svelte.dev/repl/f492cd6042be48c89f744f818176bb34?version=3.55.1
---

# {{title}}

Formats a date for a given format string code. Inspired by python [strftime](https://docs.python.org/3/library/datetime.html#datetime.date.strftime).

## 🎬 Usage

```html
<script>
    import {strftime} from "@sveu/shared"
    
    const date_str = strftime(new Date(), "%Y-%m-%d %H:%M:%S")
</script>

<p>{date_str}</p>
```

## 👩‍💻API

### 👻 Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **date**            | The date to format                           | `DateLike`            | `yes`    |
| **str**             | The format string code                       | `string`              | `yes`    |

### 🙈 Options

| Name                | Description                              | Type                    | Default     |
| ------------------- | ---------------------------------------- | ----------------------- | ----------- |
| **locales**         | The locales to use for formatting        | `Intl.LocalesArgument`  | `undefined` |
| **Intl.DateTimeFormatOptions** | [see Intl.DateTimeFormatOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) | `Intl.DateTimeFormatOptions` | `{}` |

### ↩️ Returns

A string representing the date formatted for the given format string code.

## 🧪 Playground

<iframe class="h-120 w-full" src="{{demo_link}}"></iframe>

## Source Code 👀

??? tip "Source Code"

    ```ts
    import type { DateLike, StrftimeOptions } from "../utils"

    const REGEX_PARSE =
        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/

    const REGEX_FORMAT =
        /%S|%Y|%m|%d|%H|%M|%B|%b|%I|%-I|%p|%a|%A|%w|%y|%f|%z|%Z|%j|%U|%W|%c|%x|%X/g

    /**
     * A helper function that formats a date object into a string.
     *
     * @param date - The date object to format.
     *
     * @param str - The format string.
     *
     * @returns The formatted date string.
     */
    function format(date: Date, str: string, options: StrftimeOptions): string {
        const years = date.getFullYear()

        const month = date.getMonth()

        const days = date.getDate()

        const hours = date.getHours()

        const minutes = date.getMinutes()

        const seconds = date.getSeconds()

        const milliseconds = date.getMilliseconds()

        const matches: Record<string, () => string | string> = {
            "%a": () =>
                date.toLocaleDateString(options.locales, { weekday: "short" }),

            "%A": () =>
                date.toLocaleDateString(options.locales, { weekday: "long" }),

            "%w": () => String(date.getDay()),

            "%d": () => `${days}`.padStart(2, "0"),

            "%b": () =>
                date.toLocaleDateString(options.locales, { month: "short" }),

            "%B": () => date.toLocaleDateString(options.locales, { month: "long" }),

            "%m": () => `${month + 1}`.padStart(2, "0"),

            "%y": () => `${years}`.slice(-2),

            "%Y": () => `${years}`,

            "%H": () => `${hours}`,

            "%I": () => `${hours % 12 || 12}`.padStart(1, "0"),

            "%-I": () => `${hours % 12 || 12}`.padStart(2, "0"),

            "%p": () => (hours < 12 ? "AM" : "PM"),

            "%M": () => `${minutes}`.padStart(2, "0"),

            "%S": () => `${seconds}`.padStart(2, "0"),

            "%f": () => `${milliseconds}`.padStart(3, "0"),

            "%z": () => `${date}`.match(/([+-]\d{4})/)?.[1] || "",

            "%Z": () => `${date}`.match(/([A-Z]{3,5})/)?.[1] || "",

            "%j": () => {
                const start = new Date(years, 0, 0)
                const diff = date.getTime() - start.getTime()
                const day = 1000 * 60 * 60 * 24
                return String(Math.floor(diff / day)).padStart(3, "0")
            },
            "%U": () => {
                const start = new Date(years, 0, 0)
                const diff = date.getTime() - start.getTime()
                const one_day = 1000 * 60 * 60 * 24
                const day = start.getDay()
                return String(Math.floor((diff / one_day + day) / 7)).padStart(
                    2,
                    "0"
                )
            },
            "%W": () => {
                const start = new Date(years, 0, 0)
                const diff = date.getTime() - start.getTime()
                const one_day = 1000 * 60 * 60 * 24
                const day = start.getDay()
                return String(Math.floor((diff / one_day + day) / 7)).padStart(
                    2,
                    "0"
                )
            },
            "%c": () => {
                const _options = { ...options }

                delete _options.locales

                return date.toLocaleString(options.locales, _options)
            },
        }

        function matcher(match: string) {
            if (!matches[match]) return match

            return matches[match]()
        }

        return str.replace(REGEX_FORMAT, matcher)
    }

    /**
     * A helper function that parses a value into a date object.
     *
     * @param date - The value to parse.
     *
     * @returns The parsed date object.
     */
    function parser(date: DateLike): Date {
        if (date === null) return new Date(NaN) // null is invalid

        if (date === undefined) return new Date()

        if (date instanceof Date) return new Date(date)

        if (typeof date === "string" && !/Z$/i.test(date)) {
            const d = date.match(REGEX_PARSE) as any

            if (d) {
                const m = d[2] - 1 || 0

                const ms = (d[7] || "0").substring(0, 3)

                return new Date(
                    d[1],
                    m,
                    d[3] || 1,
                    d[4] || 0,
                    d[5] || 0,
                    d[6] || 0,
                    ms
                )
            }
        }

        return new Date(date)
    }

    /**
     * Formats a date for a given format string code
     *
     * @param date - The date to format
     *
     * @param str - The format string code
     *
     * @param options - The options to pass to the date formatter
     * - locales - The locales to use for formatting
     *  - DateTimeFormatOptions - The options to pass to the date formatter.
     *
     * @see https://docs.python.org/3/library/datetime.html#datetime.date.strftime
     *
     * @see  Format Codes: https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes
     */
    export function strftime(
        date: DateLike,
        str: string,
        options: StrftimeOptions = {}
    ) {
        return format(parser(date), str, options)
    }
    ```
