<!-- Case 1 - A standalone Parameter definition - is probably reference in multiple other defintions -->

#### Parameter: `foo`

* **x** `string` - The x prop
* **y** `object` - The y prop
	* **a** `number` - Default: `0`
	* **b** `number` - Default: `0`
* **z** `boolean` - Default: `true` - The z prop

<!-- Case 2 - An argument list - would be apart of a "Method" block (not yet defined) -->

Arguments:

* **x** `string` - The x arg
* **y** `object` (optional) - The y arg
	* **a** `number` (optional) - Default: `0` - The a prop of the y arg
	* **b** `number` (optional) - Default: `0` - The b prop of the y arg
* **z** `boolean` (optional) - Default: `true` - The z arg
