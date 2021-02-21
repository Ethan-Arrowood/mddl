enum TokenType {
	SPACE,
	HYPHEN,
	DOUBLE_ASTERISK,
	BACKTICK,

	PARAMETER_IDENTIFIER,
	PARAMETER_TYPE,

	EOF
}

class Token {
	type: TokenType
	lexeme: string
	literal: unknown
	line: number

	constructor(type: TokenType, lexeme: string, literal: unknown, line: number) {
		this.type = type
		this.lexeme = lexeme
		this.literal = literal
		this.line = line
	}

	toString() {
		return `${this.type} ${this.lexeme} ${this.literal}`
	}
}

class Scanner {
	source: string
	tokens: Token[]
	start: number
	current: number
	line: number

	constructor (source: string) {
		this.source = source
		this.tokens = []

		this.start = 0
		this.current = 0
		this.line = 1
	}

	scanTokens() {
		while (!this.isAtEnd()) {
			this.start = this.current
			this.scanToken()
		}

		this.tokens.push(new Token(TokenType.EOF, "", null, this.line))
		return this.tokens
	}

	scanToken() {
		const c = this.advance()
		switch (c) {
			case '*':
				if (this.match('*')) {
					this.parameterIdentifier()
				} else {
					Scanner.error(this.line, `at position ${this.current}`, "Missing second asterisk")
				}
				break
			case '`':
				this.parameterType()
				break
			case '-':
				this.addToken(TokenType.HYPHEN)
				break
			case ' ':
				this.addToken(TokenType.SPACE)
				break
			case '\n':
				this.line++
				break
			default:
				Scanner.error(this.line, undefined, "Unexpected character.")
				break
		}
	}

	parameterIdentifier () {
		while (this.peek() !== '*' && this.peekNext() !== '*' && !this.isAtEnd()) {
			if (this.peek() === '\n') this.line++
			this.advance()
			this.advance()
		}

		if (this.isAtEnd()) {
			Scanner.error(this.line, undefined, "Unterminated identifier")
			return
		}

		this.advance()
		this.advance()

		const value = this.source.substring(this.start + 2, this.current - 2)
		this.addToken(TokenType.DOUBLE_ASTERISK)
		this.addToken(TokenType.PARAMETER_IDENTIFIER, value)
		this.addToken(TokenType.DOUBLE_ASTERISK)
	}

	parameterType () {
		while (this.peek() !== '`' && !this.isAtEnd()) {
			if (this.peek() === '\n') this.line++
			this.advance()
		}

		if (this.isAtEnd()) {
			Scanner.error(this.line, undefined, "Unterminated type")
			return
		}

		this.advance()

		const value = this.source.substring(this.start + 1, this.current - 1)
		this.addToken(TokenType.BACKTICK)
		this.addToken(TokenType.PARAMETER_TYPE, value)
		this.addToken(TokenType.BACKTICK)
	}

	match (expected: string) {
		if (this.isAtEnd()) return false
		if (this.source.charAt(this.current) !== expected) return false

		this.current++
		return true
	}

	peek () {
		if (this.isAtEnd()) return '\0'
		return this.source.charAt(this.current)
	}

	peekNext() {
		if (this.current + 1 >= this.source.length) return '\0'
		return this.source.charAt(this.current + 1)
	}

	advance() {
		this.current++
		return this.source.charAt(this.current - 1)
	}

	addToken(type: TokenType, literal: unknown = null) {
		const text = this.source.substring(this.start, this.current)
		this.tokens.push(new Token(type, text, literal, this.line))
	}

	isAlpha(c: string) {
		return (c >= 'a' && c <= 'z') ||
					 (c >= 'A' && c <= 'Z') ||
					 c === '_'
	}

	isDigit(c: string) {
		return c >= '0' && c <= '9'
	}

	isAlphaNumeric(c: string) {
		return this.isAlpha(c) || this.isDigit(c)
	}

	isAtEnd() {
		return this.current >= this.source.length
	}

	static error(line: number, where: string = "", message: string) {
		report(line, where, message)
	}
}

function report(line: number, where: string, message: string) {
	console.error(`[line ${line}] Error ${where}: ${message}`)
}

function run () {
	const input = `# Object: point

	Represents a point on a 3D grid.
	
	Parameters:
	
	* **x** - \`number\`
	* **y** - \`number\`
	* **z** - \`number\`
	`

	const scanner = new Scanner('*mddl** - `boolean`')
	const tokens = scanner.scanTokens()
	for (const token of tokens) {
		console.log(token)
	}
}

run()