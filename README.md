# vue-spur-monocle

> **Note:** This is **not** an official package. For the official Monocle documentation, please visit: [https://docs.spur.us/monocle](https://docs.spur.us/monocle)

[![CI](https://github.com/Xavier4492/vue-spur-monocle/actions/workflows/ci.yml/badge.svg)](https://github.com/Xavier4492/vue-spur-monocle/actions/workflows/ci.yml)
[![Release](https://github.com/Xavier4492/vue-spur-monocle/actions/workflows/release.yml/badge.svg)](https://github.com/Xavier4492/vue-spur-monocle/actions/workflows/release.yml)
[![npm version](https://img.shields.io/npm/v/vue-spur-monocle.svg)](https://www.npmjs.com/package/vue-spur-monocle)
[![license](https://img.shields.io/npm/l/vue-spur-monocle.svg)](LICENSE)

A Vue 3 integration for the Monocle SDK (`spur-monocle-manager`), enabling dynamic script loading and easy interaction with the Monocle API.

## Features

* Automatic injection and management of the Monocle script
* Server-Side Rendering (SSR) support (no-op on server)
* Unified API for both Composition API and Options API
* Custom events: `assessment`, `error`, `load`

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
* Node.js >= 22

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
on('assessment', payload => console.log('Success event:', payload))
// To remove an event listener
off('assessment', /* yourHandler */)
</script>
```

## API Reference

### `MonoclePlugin(opts: MonocleOptions): Plugin`

Install the plugin and injects the Monocle instance:

* `opts.token: string` — Your Monocle API token.
* `opts.initTimeout: number` — Timeout for the script to load (default: `5000` ms).
* `opts.debug: boolean` — Enable debug mode (default: `false`).
* Adds `$monocle` to `app.config.globalProperties` (Options API).
* Provides the instance under `MonocleKey` (Composition API).

### `useMonocle()`

Returns an object with methods to interact with Monocle:

* `init(): Promise<void>` — Load/inject the Monocle script.
* `getAssessment(): Promise<string>` — Refresh and retrieve the Monocle data assessment.
* `on(event: MonocleEvents, handler: (detail: any) => void): void` — Listen to events.
* `off(event: MonocleEvents, handler: (detail: any) => void): void` — Remove an event listener.

**Types exported:**

* `MonocleEvents` — `'assessment' | 'error' | 'load'`
* `MonocleOptions` — `{ token: string }`
* `MonocleKey` — Injection key symbol (for advanced usage)

## Server-Side Rendering (SSR)

This plugin detects SSR and performs no operations on the server. Both `init()` and `getAssessment()` will throw an error if called on the server. The Monocle script should be only loaded on the client side.

## Tests & CI

* Unit tests & coverage via [Vitest](https://vitest.dev/)
* Linting & type-checking using ESLint + TypeScript
* Automated releases via GitHub Actions + [Semantic Release](https://semantic-release.gitbook.io/)

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Donate

If you appreciate the work that went into this App Extension, please consider [donating to Vue.js](https://vuejs.org/support-vuejs/).

## License

MIT
