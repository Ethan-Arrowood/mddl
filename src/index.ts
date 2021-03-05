type Token = {
	type: string;
	value: string;
}

function tokenize (input: string): Token[] {
	let currentIndex = 0
	let currentCharacter = input[currentIndex++]

	const tokens = []

	// scan
	while (currentIndex < input.length) {
		// start of **identifier**
		if (currentCharacter === '*') {
			// advance to next character
			currentCharacter = input[currentIndex++]
			// matches opening `**`
			if (currentCharacter === '*') {
				// advance to next character
				currentCharacter = input[currentIndex++]
				// loop over identifier value
				let identifierValue = ''
				while (isValidIdentifierCharacter(currentCharacter)) {
					identifierValue += currentCharacter
					currentCharacter = input[currentIndex++]
				}
				// if loop exits, it means we either found a '*' or an invalid identifier character
				if (currentCharacter === '*') {
					// advance to next character
					currentCharacter = input[currentIndex++]
					// matches closing `**`
					if (currentCharacter === '*') {
						tokens.push({
							type: 'identifier',
							value: identifierValue
						})
					} else {
						throw new Error(`Invalid character ${currentCharacter} found at index ${currentIndex}. Expected second '*' character.`)
					}
				} else {
					throw new Error(`Invalid character ${currentCharacter} found at index ${currentIndex}. Expected closing '**' characters.`)
				}
			} else {
				// throw invalid character error
				throw new Error(`Invalid character ${currentCharacter} found at index ${currentIndex}. Expected second '*' character.`)
			}
		}

		currentCharacter = input[currentIndex++]
	}

	return tokens
}

// for now, a valid identifier is alpha-numeric
function isValidIdentifierCharacter(char: string) {
	return (
		(char >= 'a' && char <= 'z') ||
		(char >= 'A' && char <= 'Z') ||
		(char >= '0' && char <= '9')
	)
}

function runTests (tests: Tests) {
	let testCount = 0
	for (const [input, expected] of tests) {
		console.log(`Test #${testCount} - Input: ${input}`)
		console.log('Expected:', expected)
		console.log('Actual:', tokenize(input))
	}
}
type Tests = [string, Token[]][]
const tests: Tests = [
	['**name**', [{ type: 'identifier', value: 'name' }]]
]
runTests(tests)