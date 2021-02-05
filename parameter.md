&emsp;&emsp;<a name="Identifier"></a>*Identifier* **:**  
&emsp;&emsp;&emsp;<a name="Identifier-571ac50f"></a>Any valid JavaScript identifier  
  
&emsp;&emsp;<a name="Type"></a>*Type* **:**  
&emsp;&emsp;&emsp;<a name="Type-eceadf0e"></a>Any valid TypeScript type  
  
&emsp;&emsp;<a name="Value"></a>*Value* **:**  
&emsp;&emsp;&emsp;<a name="Value-c04942aa"></a>Any valid JavaScript value that is assignable to the associated Type  
  
&emsp;&emsp;<a name="Description"></a>*Description* **:**  
&emsp;&emsp;&emsp;<a name="Description-83dfa428"></a>A single-line description. Supports markdown syntax.  
  
&emsp;&emsp;<a name="ParameterBase"></a>*ParameterBase*<sub>[Object]</sub> **:**  
&emsp;&emsp;&emsp;<a name="ParameterBase-caed00c9"></a>`` * ``&emsp;`` ** ``&emsp;*[Identifier](#Identifier)*&emsp;`` ** ``&emsp;`` ` ``&emsp;*[Type](#Type)*&emsp;`` ` ``  
&emsp;&emsp;&emsp;<a name="ParameterBase-24f3e96e"></a>[~Object]&emsp;`` * ``&emsp;`` ** ``&emsp;*[Identifier](#Identifier)*&emsp;`` ** ``&emsp;`` ` ``&emsp;`` object ``&emsp;`` ` ``  
  
&emsp;&emsp;<a name="SingleLineParameter"></a>*SingleLineParameter*<sub>[Object]</sub> **:** <a name="SingleLineParameter-1cfe51e9"></a>*[ParameterBase](#ParameterBase)*<sub>[?Object]</sub>  
  
&emsp;&emsp;<a name="MultiLineParameter"></a>*MultiLineParameter*<sub>[Object]</sub> **::**  
&emsp;&emsp;&emsp;<a name="MultiLineParameter-4d8c0f24"></a>*[SingleLineParameter](#SingleLineParameter)*<sub>[+Object]</sub>  
&emsp;&emsp;&emsp;<a name="MultiLineParameter-96955a54"></a>&lt;TAB&gt;&emsp;*[Parameter](#Parameter)*<sub>[?Object]</sub>  
  
&emsp;&emsp;<a name="Parameter"></a>*Parameter*<sub>[Object]</sub> **:**  
&emsp;&emsp;&emsp;<a name="Parameter-c0200af6"></a>*[SingleLineParameter](#SingleLineParameter)*<sub>[?Object]</sub>  
&emsp;&emsp;&emsp;<a name="Parameter-23431d4d"></a>*[MultiLineParameter](#MultiLineParameter)*<sub>[?Object]</sub>  
  
