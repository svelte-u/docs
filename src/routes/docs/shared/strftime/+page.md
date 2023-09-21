---
title: Strftime
description: Formats a date for a given format string code.
---

<script>
    import Meta from "$components/meta.svelte"
</script>

<Meta />

Formats a date for a given format string code. Inspired by python [strftime](https://docs.python.org/3/library/datetime.html#datetime.date.strftime).

## Usage

```svelte
<script>
    import {strftime} from "@sveu/shared"
    
    const date_str = strftime(new Date(), "%Y-%m-%d %H:%M:%S")
</script>

<p>{date_str}</p>
```

## Example

```svelte live ln
<script lang="ts">
    import { strftime } from "@sveu/shared"

    const options = {
        locales: "ja",
        weekday: undefined,
        year: undefined,
        month: undefined,
        day: undefined,
        minute: undefined,
        numberingSystem: "arabic",
    }
    let code = "%c"

    $: time = strftime(+Date.now() - 1000 * 60 * 5, code, options)
</script>

<label for="code">Format code</label>
<input id="code" bind:value="{code}" />

<h1>{time}</h1>

<label for="locale">Locale</label>
<select id="locale" bind:value="{options.locales}">
    <option value="ar">عربي</option>
    <option value="en">English</option>
    <option value="es">Español</option>
    <option value="de">Deutsch</option>
    <option value="zh">中文</option>
    <option value="ja">日本語</option>
    <option value="fr">français</option>
    <option value="hi">हिंदी</option>
    <option value="ko">한국어/韓國語</option>
    <option value="am">हአማርኛ</option>
</select>
<hr />

<label for="weekdaye">Weekday</label>
<select id="weekday" bind:value="{options.weekday}">
    <option value="long">Long</option>
    <option value="short">Short</option>
    <option value="narrow">Narrow</option>
</select>


<button on:click="{() => (options.weekday = undefined)}">
    Default weekday
</button>
<hr />

<label for="year">Year</label>
<select id="year" bind:value="{options.year}">
    <option value="numeric">Numeric</option>
    <option value="2-digit">2 digit</option>
</select>

<button on:click="{() => (options.year = undefined)}"> Default year </button>
<hr />

<label for="month">Month</label>
<select id="month" bind:value="{options.month}">
    <option value="numeric">Numeric</option>
    <option value="2-digit">2 digit</option>
    <option value="long">Long</option>
    <option value="short">Short</option>
    <option value="narrow">Narrow</option>
</select>

<button on:click="{() => (options.month = undefined)}"> Default month </button>
<hr />

<label for="day">Day</label>
<select id="day" bind:value="{options.day}">
    <option value="numeric">Numeric</option>
    <option value="2-digit">2 digit</option>
</select>

<button on:click="{() => (options.day = undefined)}"> Default day </button>
<hr />

<label for="minute">Minute</label>
<select id="minute" bind:value="{options.minute}">
    <option value="numeric">Numeric</option>
    <option value="2-digit">2 digit</option>
</select>

<button on:click="{() => (options.minute = undefined)}">
    Default minute
</button>
<hr />
```

## API

### Arguments

| Name                | Description                                  | Type                  | Required |
| ------------------- | -------------------------------------------- | --------------------- | -------- |
| **date**            | The date to format                           | `DateLike`            | `yes`    |
| **str**             | The format string code                       | `string`              | `yes`    |

<br />
<br />

### Options

| Name                | Description                              | Type                    | Default     |
| ------------------- | ---------------------------------------- | ----------------------- | ----------- |
| **locales**         | The locales to use for formatting        | `Intl.LocalesArgument`  | `undefined` |
| **Intl.DateTimeFormatOptions** | [see Intl.DateTimeFormatOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) | `Intl.DateTimeFormatOptions` | `` |

<br />
<br />

### Format Code

| Code         | Description                                            | Example                   |
| ------------ | ------------------------------------------------------ | ------------------------- |
| `%a`         | Weekday as locale’s abbreviated name.                  | `Mon`                     |
| `%A`         | Weekday as locale’s full name.                         | `Monday`                  |
| `%w`         | Weekday as a decimal number, where 0 is Sunday.        | `1`                       |
| `%d`         | Day of the month as a zero-padded decimal number.      | `02`                      |
| `%b`         | Month as locale’s abbreviated name.                    | `Jan`                     |
| `%B`         | Month as locale’s full name.                           | `January`                 |
| `%m`         | Month as a zero-padded decimal number.                 | `01`                      |
| `%y`         | Year without century as a zero-padded decimal number.  | `00,01..,99`              |
| `%Y`         | Year with century as a decimal number.                 | `2021`                    |
| `%H`         | Hour (24-hour clock) as a zero-padded decimal number.  | `00,01..,23`              |
| `%I`         | Hour (12-hour clock) as a zero-padded decimal number.  | `01,02..,12`              |
| `%-I`        | Hour (12-hour clock) decimal number.                   | `1,2..,12`                |
| `%p`         | Locale’s equivalent of either AM or PM.                | `AM,PM`                   |
| `%M`         | Minute as a zero-padded decimal number.                | `00,01..,59`              |
| `%S`         | Second as a zero-padded decimal number.                | `00,01..,59`              |
| `%f`         | Microsecond as a decimal number, zero-padded on the left. | `000000,000001..,999999` |
| `%z`         | UTC offset in the form +HHMM or -HHMM.                 | `+0000,-0400,+1030`       |
| `%Z`         | Time zone name.                                        | `UTC,EST,CST`             |
| `%j`         | Day of the year as a zero-padded decimal number.       | `001,002..,366`           |
| `%U`         | Week number of the year (Sunday as the first day of the week) as a zero padded decimal number. All days in a new year preceding the first Sunday are considered to be in week 0. | `00,01..,53` |
| `%W`         | Week number of the year (Monday as the first day of the week) as a decimal number. All days in a new year preceding the first Monday are considered to be in week 0. | `00,01..,53` |
| `%c`         | Locale’s appropriate date and time representation.     | `Mon Sep 30 07:06:05 2013` |
