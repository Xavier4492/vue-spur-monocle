# vue-spur-monocle

[![npm version](https://img.shields.io/npm/v/vue-spur-monocle.svg)](https://www.npmjs.com/package/vue-spur-monocle) [![build](https://img.shields.io/github/actions/workflow/status/Xavier4492/vue-spur-monocle/ci.yml?branch=main)](https://github.com/Xavier4492/vue-spur-monocle/actions) [![license](https://img.shields.io/npm/l/vue-spur-monocle.svg)](LICENSE)

A Vue 3 integration for the Monocle SDK (`spur-monocle-manager`), enabling dynamic script loading and easy interaction with the Monocle API.

## Features

* Automatic injection and management of the Monocle script
* Server-Side Rendering (SSR) support (no-op on server)
* Unified API for both Composition API and Options API
* Custom events: `monocle-success`, `monocle-error`, `monocle-onload`

## Table of Contents

* [Installation](#installation)
* [Requirements](#requirements)
* [Usage](#usage)
  * [1. Options API](#1-options-api)
  * [2. Composition API](#2-composition-api)
* [API Reference](#api-reference)
  * [`MonoclePlugin(opts: MonocleOptions): Plugin`](#monoclepluginopts-monocleoptions-plugin)
  * [`useMonocle()`](#usemonocle)
* [Server-Side Rendering (SSR)](#server-side-rendering-ssr)
* [Tests & CI](#tests--ci)
* [Contributing](#contributing)
* [License](#license)

## Installation

```bash
npm install vue-spur-monocle
# or
yarn add vue-spur-monocle
```

## Requirements

* Vue 3
* Node.js >= 16

## Usage

### 1. Options API

In your main entry file (e.g., `main.ts`):

```ts
import { createApp } from 'vue'
import MonoclePlugin from 'vue-spur-monocle'
import App from './App.vue'

const app = createApp(App)

app.use(MonoclePlugin, {
  token: process.env.VUE_APP_MONOCLE_TOKEN!
})

app.mount('#app')
```

Inside your components:

```vue
<template>
  <button @click="loadAssessment">Load Assessment</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    async loadAssessment() {
      try {
        await this.$monocle.init()
        const data = await this.$monocle.getAssessment()
        console.log('Assessment data:', data)
      } catch (error) {
        console.error('Monocle error:', error)
      }
    }
  }
})
</script>
```

### 2. Composition API

In your main entry file:

```ts
import { createApp } from 'vue'
import MonoclePlugin from 'vue-spur-monocle'
import App from './App.vue'

const app = createApp(App)
app.use(MonoclePlugin, {
  token: import.meta.env.VITE_MONOCLE_TOKEN!
})
app.mount('#app')
```

In a `<script setup>` component:

```vue
<template>
  <button @click="fetchAssessment">Fetch Assessment</button>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useMonocle } from 'vue-spur-monocle'

const { init, getAssessment, on, off } = useMonocle()

onMounted(async () => {
  await init()
})

function fetchAssessment() {
  getAssessment()
    .then(data => console.log('Assessment data:', data))
    .catch(err => console.error('Error:', err))
}

// Example event subscription
on('monocle-success', payload => console.log('Success event:', payload))
// To remove an event listener
off('monocle-success', /* yourHandler */)
</script>
```

## API Reference

### `MonoclePlugin(opts: MonocleOptions): Plugin`

Install the plugin and injects the Monocle instance:

* `opts.token: string` — Your Monocle API token.
* Adds `$monocle` to `app.config.globalProperties` (Options API).
* Provides the instance under `MonocleKey` (Composition API).

### `useMonocle()`

Returns an object with methods to interact with Monocle:

* `init(): Promise<void>` — Load/inject the Monocle script.
* `getAssessment(): Promise<any>` — Refresh and retrieve the Monocle data assessment.
* `on(event: MonocleEvents, handler: (detail: any) => void): void` — Listen to events.
* `off(event: MonocleEvents, handler: (detail: any) => void): void` — Remove an event listener.

**Types exported:**

* `MonocleEvents` — `'monocle-success' | 'monocle-error' | 'monocle-onload'`
* `MonocleOptions` — `{ token: string }`
* `MonocleKey` — Injection key symbol (for advanced usage)

## Server-Side Rendering (SSR)

This plugin detects SSR and performs no operations on the server. Both `init()` and `getAssessment()` immediately resolve with no side effects when `window` is undefined.

## Tests & CI

* Unit tests & coverage via [Vitest](https://vitest.dev/)
* Linting & type-checking using ESLint + TypeScript
* Automated releases via GitHub Actions + [Semantic Release](https://semantic-release.gitbook.io/)

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

MIT
