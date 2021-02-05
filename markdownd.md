&emsp;&emsp;<a name="Identifier"></a>*Identifier* **:**  
&emsp;&emsp;&emsp;<a name="Identifier-571ac50f"></a>Any valid JavaScript identifier  
  
&emsp;&emsp;<a name="Type"></a>*Type* **:**  
&emsp;&emsp;&emsp;<a name="Type-eceadf0e"></a>Any valid TypeScript type  
  
&emsp;&emsp;<a name="Value"></a>*Value* **:**  
&emsp;&emsp;&emsp;<a name="Value-c04942aa"></a>Any valid JavaScript value that is assignable to the associated Type  
  
&emsp;&emsp;<a name="Description"></a>*Description* **:**  
&emsp;&emsp;&emsp;<a name="Description-83dfa428"></a>A single-line description. Supports markdown syntax.  
  
&emsp;&emsp;<a name="DefaultValue"></a>*DefaultValue* **:** <a name="DefaultValue-859a697c"></a>`` Default ``&emsp;`` ` ``&emsp;*[Value](#Value)*&emsp;`` ` ``  
  
&emsp;&emsp;<a name="ParameterBase"></a>*ParameterBase* **:** <a name="ParameterBase-caed00c9"></a>`` * ``&emsp;`` ** ``&emsp;*[Identifier](#Identifier)*&emsp;`` ** ``&emsp;`` ` ``&emsp;*[Type](#Type)*&emsp;`` ` ``  
  
&emsp;&emsp;<a name="ParameterWithDefaultValue"></a>*ParameterWithDefaultValue* **:** <a name="ParameterWithDefaultValue-5c75e1d5"></a>*[ParameterBase](#ParameterBase)*&emsp;`` - ``&emsp;*[DefaultValue](#DefaultValue)*  
  
&emsp;&emsp;<a name="ParameterWithDescription"></a>*ParameterWithDescription* **:**  
&emsp;&emsp;&emsp;<a name="ParameterWithDescription-870b1ebb"></a>*[ParameterBase](#ParameterBase)*&emsp;`` - ``&emsp;*[Description](#Description)*  
&emsp;&emsp;&emsp;<a name="ParameterWithDescription-333014e6"></a>*[ParameterWithDefaultValue](#ParameterWithDefaultValue)*&emsp;`` - ``&emsp;*[Description](#Description)*  
  
&emsp;&emsp;<a name="Parameter"></a>*Parameter* **:**  
&emsp;&emsp;&emsp;<a name="Parameter-c506e66b"></a>*[ParameterBase](#ParameterBase)*  
&emsp;&emsp;&emsp;<a name="Parameter-fe9b097e"></a>*[ParameterWithDefaultValue](#ParameterWithDefaultValue)*  
&emsp;&emsp;&emsp;<a name="Parameter-b795daaf"></a>*[ParameterWithDescription](#ParameterWithDescription)*  
  
&emsp;&emsp;<a name="ArgumentBase"></a>*ArgumentBase* **:**  
&emsp;&emsp;&emsp;<a name="ArgumentBase-c506e66b"></a>*[ParameterBase](#ParameterBase)*  
&emsp;&emsp;&emsp;<a name="ArgumentBase-52463b67"></a>*[ParameterBase](#ParameterBase)*&emsp;`` (optional) ``  
  
&emsp;&emsp;<a name="ArgumentWithDefaultValue"></a>*ArgumentWithDefaultValue* **:** <a name="ArgumentWithDefaultValue-ca27c4a3"></a>*[ArgumentBase](#ArgumentBase)*&emsp;`` - ``&emsp;*[DefaultValue](#DefaultValue)*  
  
&emsp;&emsp;<a name="ArgumentWithDescription"></a>*ArgumentWithDescription* **:**  
&emsp;&emsp;&emsp;<a name="ArgumentWithDescription-7bedef70"></a>*[ArgumentBase](#ArgumentBase)*&emsp;`` - ``&emsp;*[Description](#Description)*  
&emsp;&emsp;&emsp;<a name="ArgumentWithDescription-f5f4edf6"></a>*[ArgumentWithDefaultValue](#ArgumentWithDefaultValue)*&emsp;`` - ``&emsp;*[Description](#Description)*  
  
&emsp;&emsp;<a name="Argument"></a>*Argument* **:**  
&emsp;&emsp;&emsp;<a name="Argument-4eceba59"></a>*[ArgumentBase](#ArgumentBase)*  
&emsp;&emsp;&emsp;<a name="Argument-34b791ad"></a>*[ArgumentWithDefaultValue](#ArgumentWithDefaultValue)*  
&emsp;&emsp;&emsp;<a name="Argument-41dce044"></a>*[ArgumentWithDescription](#ArgumentWithDescription)*  
  
