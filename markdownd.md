&emsp;&emsp;<a name="Identifier"></a>*Identifier* **:**  
&emsp;&emsp;&emsp;<a name="Identifier-571ac50f"></a>Any valid JavaScript identifier  
  
&emsp;&emsp;<a name="Type"></a>*Type* **:**  
&emsp;&emsp;&emsp;<a name="Type-eceadf0e"></a>Any valid TypeScript type  
  
&emsp;&emsp;<a name="Value"></a>*Value* **:**  
&emsp;&emsp;&emsp;<a name="Value-c04942aa"></a>Any valid JavaScript value that is assignable to the associated Type  
  
&emsp;&emsp;<a name="Description"></a>*Description* **:**  
&emsp;&emsp;&emsp;<a name="Description-83dfa428"></a>A single-line description. Supports markdown syntax.  
  
&emsp;&emsp;<a name="DefaultValue"></a>*DefaultValue* **:** <a name="DefaultValue-859a697c"></a>`` Default ``&emsp;`` ` ``&emsp;*[Value](#Value)*&emsp;`` ` ``  
  
&emsp;&emsp;<a name="ParameterBase"></a>*ParameterBase*<sub>[Object]</sub> **:**  
&emsp;&emsp;&emsp;<a name="ParameterBase-caed00c9"></a>`` * ``&emsp;`` ** ``&emsp;*[Identifier](#Identifier)*&emsp;`` ** ``&emsp;`` ` ``&emsp;*[Type](#Type)*&emsp;`` ` ``  
&emsp;&emsp;&emsp;<a name="ParameterBase-24f3e96e"></a>[~Object]&emsp;`` * ``&emsp;`` ** ``&emsp;*[Identifier](#Identifier)*&emsp;`` ** ``&emsp;`` ` ``&emsp;`` object ``&emsp;`` ` ``  
  
&emsp;&emsp;<a name="ParameterWithDefaultValue"></a>*ParameterWithDefaultValue*<sub>[Object]</sub> **:** <a name="ParameterWithDefaultValue-3f33c6f9"></a>*[ParameterBase](#ParameterBase)*<sub>[?Object]</sub>&emsp;`` - ``&emsp;*[DefaultValue](#DefaultValue)*  
  
&emsp;&emsp;<a name="ParameterWithDescription"></a>*ParameterWithDescription*<sub>[Object]</sub> **:**  
&emsp;&emsp;&emsp;<a name="ParameterWithDescription-1fe612e4"></a>*[ParameterBase](#ParameterBase)*<sub>[?Object]</sub>&emsp;`` - ``&emsp;*[Description](#Description)*  
&emsp;&emsp;&emsp;<a name="ParameterWithDescription-a91daeab"></a>*[ParameterWithDefaultValue](#ParameterWithDefaultValue)*<sub>[?Object]</sub>&emsp;`` - ``&emsp;*[Description](#Description)*  
  
&emsp;&emsp;<a name="SingleLineParameter"></a>*SingleLineParameter*<sub>[Object]</sub> **:**  
&emsp;&emsp;&emsp;<a name="SingleLineParameter-1cfe51e9"></a>*[ParameterBase](#ParameterBase)*<sub>[?Object]</sub>  
&emsp;&emsp;&emsp;<a name="SingleLineParameter-0e844aa1"></a>*[ParameterWithDefaultValue](#ParameterWithDefaultValue)*<sub>[?Object]</sub>  
&emsp;&emsp;&emsp;<a name="SingleLineParameter-10deba02"></a>*[ParameterWithDescription](#ParameterWithDescription)*<sub>[?Object]</sub>  
  
&emsp;&emsp;<a name="ParameterList"></a>*ParameterList* **:** <a name="ParameterList-f699f295"></a>*[Parameter](#Parameter)*  
  
&emsp;&emsp;<a name="ParameterList"></a>*ParameterList* **::**  
&emsp;&emsp;&emsp;<a name="ParameterList-acdf35da"></a>*[ParameterList](#ParameterList)*  
&emsp;&emsp;&emsp;<a name="ParameterList-f699f295"></a>*[Parameter](#Parameter)*  
  
&emsp;&emsp;<a name="MultiLineParameter"></a>*MultiLineParameter* **::**  
&emsp;&emsp;&emsp;<a name="MultiLineParameter-4d8c0f24"></a>*[SingleLineParameter](#SingleLineParameter)*<sub>[+Object]</sub>  
&emsp;&emsp;&emsp;<a name="MultiLineParameter-3e0f797d"></a>&lt;TAB&gt;&emsp;*[ParameterList](#ParameterList)*  
  
&emsp;&emsp;<a name="Parameter"></a>*Parameter* **:**  
&emsp;&emsp;&emsp;<a name="Parameter-cbe5e6f7"></a>*[SingleLineParameter](#SingleLineParameter)*<sub>[~Object]</sub>  
&emsp;&emsp;&emsp;<a name="Parameter-3aa6b7b9"></a>*[MultiLineParameter](#MultiLineParameter)*  
  
