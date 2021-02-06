type Identifier = any

type Type = string

type Value = string

type Description = string

type DefaultValue = `Default: ${Value}`

type ParameterBase<T extends Type> = `* **${Identifier}** \`${T}\``

type ParameterWithDefaultValue<T extends Type> = `${ParameterBase<T>} - ${DefaultValue}`

type ParameterWithDescription<T extends Type> = `${ParameterBase<T> | ParameterWithDefaultValue<T>} - ${Description}`

type SingleLineParameter<T extends Type = 'any'> = ParameterBase<T> | ParameterWithDefaultValue<T> | ParameterWithDescription<T>

type TakeFirst<V> = V extends [] 
	? never : V extends [string] 
		? V[0] : V extends [...infer R, string] 
			? TakeFirst<R> : never;

type Flatten<V> = V extends []
	? never : V extends [string]
		? 

type ParameterList = `\n\t${SingleLineParameter}`[]
type MultiLineParameter = `${SingleLineParameter<'object'>}\n\t${ParameterList}`

type Parameter<T extends Type = Type> = SingleLineParameter<T> | MultiLineParameter