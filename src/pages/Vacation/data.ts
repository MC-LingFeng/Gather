export const showData = {
  "messages": [
      {
          "lc": 1,
          "type": "constructor",
          "id": [
              "langchain_core",
              "messages",
              "SystemMessage"
          ],
          "kwargs": {
              "content": "你是一个旅行博主。",
              "additional_kwargs": {},
              "response_metadata": {},
              "id": "a072c3be-9a12-4792-bc16-e4142014e9f5"
          }
      },
      {
          "lc": 1,
          "type": "constructor",
          "id": [
              "langchain_core",
              "messages",
              "SystemMessage"
          ],
          "kwargs": {
              "content": "你会分析{WeatherResType}和{RainResType}类型，根据工具{weatherTool}和{rainTool}返回的天气和火车票的数据，分析整个行程的路线及游玩策略等。",
              "additional_kwargs": {},
              "response_metadata": {},
              "id": "0f717471-6529-428b-9c87-e17b7404ac6a"
          }
      },
      {
          "lc": 1,
          "type": "constructor",
          "id": [
              "langchain_core",
              "messages",
              "SystemMessage"
          ],
          "kwargs": {
              "content": "如果{weatherTool}和{rainTool}返回的天气和火车票的数据有空数据或你无法识别的数据，请告知用户。",
              "additional_kwargs": {},
              "response_metadata": {},
              "id": "09ef2d0c-6f04-4b34-8382-9fee0ecc168b"
          }
      },
      {
          "lc": 1,
          "type": "constructor",
          "id": [
              "langchain_core",
              "messages",
              "HumanMessage"
          ],
          "kwargs": {
              "content": "请查询以下城市的未来7天天气和火车票余票情况，生成一篇旅行攻略。",
              "additional_kwargs": {},
              "response_metadata": {},
              "id": "4dfa92a2-29a6-436c-989b-ece06c805688"
          }
      },
      {
          "lc": 1,
          "type": "constructor",
          "id": [
              "langchain_core",
              "messages",
              "AIMessage"
          ],
          "kwargs": {
              "content": "好的，我会根据工具生成的未来7天天气情况和火车票余票情况，生成一篇旅行攻略。",
              "tool_calls": [],
              "invalid_tool_calls": [],
              "additional_kwargs": {},
              "response_metadata": {},
              "id": "164115f7-f89a-457d-9fa2-3300ab15722c"
          }
      },
      {
          "lc": 1,
          "type": "constructor",
          "id": [
              "langchain_core",
              "messages",
              "AIMessage"
          ],
          "kwargs": {
              "id": "chatcmpl-DNaDV82phAOFOcMFMM7WGlj5OqBAr",
              "name": "model",
              "content": "",
              "additional_kwargs": {
                  "tool_calls": [
                      {
                          "id": "call_q8iy6WK32m89469hp4gukyWz",
                          "type": "function",
                          "function": {
                              "name": "get_weather",
                              "parameters": null,
                              "arguments": "{\"place\": [\"北京\", \"上海\"], \"sheng\": [\"北京\", \"上海\"], \"y\": \"2023\", \"d\": \"1\", \"m\": \"12\"}"
                          }
                      },
                      {
                          "id": "call_ZswGLvQ2YvwzQbHL9PS97pmd",
                          "type": "function",
                          "function": {
                              "name": "get_rain",
                              "parameters": null,
                              "arguments": "{\"place\": [\"北京\", \"上海\"], \"sheng\": [\"北京\", \"上海\"], \"y\": \"2023\", \"d\": \"1\", \"m\": \"12\"}"
                          }
                      }
                  ]
              },
              "response_metadata": {
                  "tokenUsage": {
                      "promptTokens": 295,
                      "completionTokens": 92,
                      "totalTokens": 387
                  },
                  "finish_reason": "tool_calls",
                  "model_provider": "openai",
                  "model_name": "gpt-4o",
                  "usage": {
                      "prompt_tokens": 295,
                      "completion_tokens": 92,
                      "total_tokens": 387,
                      "prompt_tokens_details": {
                          "cached_tokens": 0,
                          "audio_tokens": 0
                      },
                      "completion_tokens_details": {
                          "audio_tokens": 0,
                          "reasoning_tokens": 0,
                          "accepted_prediction_tokens": 0,
                          "rejected_prediction_tokens": 0
                      },
                      "input_tokens": 0,
                      "output_tokens": 0,
                      "input_tokens_details": null
                  },
                  "system_fingerprint": "fp_e9b9b028d7"
              },
              "type": "ai",
              "tool_calls": [
                  {
                      "name": "get_weather",
                      "args": {
                          "place": [
                              "北京",
                              "上海"
                          ],
                          "sheng": [
                              "北京",
                              "上海"
                          ],
                          "y": "2023",
                          "d": "1",
                          "m": "12"
                      },
                      "type": "tool_call",
                      "id": "call_q8iy6WK32m89469hp4gukyWz"
                  },
                  {
                      "name": "get_rain",
                      "args": {
                          "place": [
                              "北京",
                              "上海"
                          ],
                          "sheng": [
                              "北京",
                              "上海"
                          ],
                          "y": "2023",
                          "d": "1",
                          "m": "12"
                      },
                      "type": "tool_call",
                      "id": "call_ZswGLvQ2YvwzQbHL9PS97pmd"
                  }
              ],
              "invalid_tool_calls": [],
              "usage_metadata": {
                  "output_tokens": 92,
                  "input_tokens": 295,
                  "total_tokens": 387,
                  "input_token_details": {
                      "audio": 0,
                      "cache_read": 0
                  },
                  "output_token_details": {
                      "audio": 0,
                      "reasoning": 0
                  }
              }
          }
      },
      {
          "lc": 1,
          "type": "constructor",
          "id": [
              "langchain_core",
              "messages",
              "ToolMessage"
          ],
          "kwargs": {
              "status": "success",
              "content": "[{\"code\":200,\"guo\":\"中国\",\"sheng\":\"北京\",\"shi\":\"北京\",\"name\":\"北京\",\"weather1\":\"多云\",\"weather2\":\"多云\",\"wd1\":\"24\",\"wd2\":\"10\",\"winddirection1\":\"北风\",\"winddirection2\":\"东北风\",\"windleve1\":\"微风\",\"windleve2\":\"微风\",\"weather1img\":\"https://rescdn.apihz.cn/resimg/tianqi/duoyun.png\",\"weather2img\":\"https://rescdn.apihz.cn/resimg/tianqi/duoyun.png\",\"lon\":\"116.470\",\"lat\":\"39.810\",\"uptime\":\"2026-03-26 12:00:00\",\"nowinfo\":{\"precipitation\":0,\"temperature\":23.9,\"pressure\":1006,\"humidity\":34,\"windDirection\":\"东南风\",\"windDirectionDegree\":175,\"windSpeed\":1.5,\"windScale\":\"微风\",\"feelst\":23.9,\"uptime\":\"2026/03/26 16:05\"},\"alarm\":null,\"weatherday2\":{\"date\":\"2026/03/27\",\"weather1\":\"多云\",\"weather2\":\"多云\",\"wd1\":20,\"wd2\":9,\"winddirection1\":\"西南风\",\"winddirection2\":\"南风\",\"windleve1\":\"微风\",\"windleve2\":\"微风\",\"weather1img\":\"https://rescdn.apihz.cn/resimg/tianqi/duoyun.png\",\"weather2img\":\"https://rescdn.apihz.cn/resimg/tianqi/duoyun.png\"},\"weatherday3\":{\"date\":\"2026/03/28\",\"weather1\":\"阴\",\"weather2\":\"小雨\",\"wd1\":19,\"wd2\":9,\"winddirection1\":\"南风\",\"winddirection2\":\"东北风\",\"windleve1\":\"微风\",\"windleve2\":\"微风\",\"weather1img\":\"https://rescdn.apihz.cn/resimg/tianqi/yin.png\",\"weather2img\":\"https://rescdn.apihz.cn/resimg/tianqi/xiaoyu.png\"},\"weatherday4\":{\"date\":\"2026/03/29\",\"weather1\":\"晴\",\"weather2\":\"多云\",\"wd1\":22,\"wd2\":7,\"winddirection1\":\"北风\",\"winddirection2\":\"北风\",\"windleve1\":\"3~4级\",\"windleve2\":\"微风\",\"weather1img\":\"https://rescdn.apihz.cn/resimg/tianqi/qing.png\",\"weather2img\":\"https://rescdn.apihz.cn/resimg/tianqi/duoyun.png\"},\"weatherday5\":{\"date\":\"2026/03/30\",\"weather1\":\"多云\",\"weather2\":\"阴\",\"wd1\":17,\"wd2\":7,\"winddirection1\":\"西南风\",\"winddirection2\":\"西南风\",\"windleve1\":\"微风\",\"windleve2\":\"微风\",\"weather1img\":\"https://rescdn.apihz.cn/resimg/tianqi/duoyun.png\",\"weather2img\":\"https://rescdn.apihz.cn/resimg/tianqi/yin.png\"},\"weatherday6\":{\"date\":\"2026/03/31\",\"weather1\":\"阴\",\"weather2\":\"小雨\",\"wd1\":17,\"wd2\":6,\"winddirection1\":\"南风\",\"winddirection2\":\"西北风\",\"windleve1\":\"微风\",\"windleve2\":\"微风\",\"weather1img\":\"https://rescdn.apihz.cn/resimg/tianqi/yin.png\",\"weather2img\":\"https://rescdn.apihz.cn/resimg/tianqi/xiaoyu.png\"},\"weatherday7\":{\"date\":\"2026/04/01\",\"weather1\":\"晴\",\"weather2\":\"多云\",\"wd1\":18,\"wd2\":4,\"winddirection1\":\"西北风\",\"winddirection2\":\"北风\",\"windleve1\":\"3~4级\",\"windleve2\":\"微风\",\"weather1img\":\"https://rescdn.apihz.cn/resimg/tianqi/qing.png\",\"weather2img\":\"https://rescdn.apihz.cn/resimg/tianqi/duoyun.png\"}},{\"code\":200,\"guo\":\"中国\",\"sheng\":\"上海\",\"shi\":\"徐家汇\",\"name\":\"徐家汇\",\"weather1\":\"阴\",\"weather2\":\"小雨\",\"wd1\":\"18\",\"wd2\":\"11\",\"winddirection1\":\"东南风\",\"winddirection2\":\"东南风\",\"windleve1\":\"微风\",\"windleve2\":\"微风\",\"weather1img\":\"https://rescdn.apihz.cn/resimg/tianqi/yin.png\",\"weather2img\":\"https://rescdn.apihz.cn/resimg/tianqi/xiaoyu.png\",\"lon\":\"121.430\",\"lat\":\"31.190\",\"uptime\":\"2026-03-26 12:00:00\",\"nowinfo\":{\"precipitation\":0,\"temperature\":16,\"pressure\":1015,\"humidity\":50,\"windDirection\":\"9999\",\"windDirectionDegree\":9999,\"windSpeed\":0.1,\"windScale\":\"微风\",\"feelst\":16.2,\"uptime\":\"2026/03/26 16:00\"},\"alarm\":null,\"weatherday2\":{\"date\":\"2026/03/27\",\"weather1\":\"阴\",\"weather2\":\"晴\",\"wd1\":19,\"wd2\":10,\"winddirection1\":\"东风\",\"winddirection2\":\"东风\",\"windleve1\":\"微风\",\"windleve2\":\"微风\",\"weather1img\":\"https://rescdn.apihz.cn/resimg/tianqi/yin.png\",\"weather2img\":\"https://rescdn.apihz.cn/resimg/tianqi/qing.png\"},\"weatherday3\":{\"date\":\"2026/03/28\",\"weather1\":\"多云\",\"weather2\":\"小雨\",\"wd1\":21,\"wd2\":13,\"winddirection1\":\"东南风\",\"winddirection2\":\"南风\",\"windleve1\":\"微风\",\"windleve2\":\"微风\",\"weather1img\":\"https://rescdn.apihz.cn/resimg/tianqi/duoyun.png\",\"weather2img\":\"https://rescdn.apihz.cn/resimg/tianqi/xiaoyu.png\"},\"weatherday4\":{\"date\":\"2026/03/29\",\"weather1\":\"阴\",\"weather2\":\"小雨\",\"wd1\":23,\"wd2\":13,\"winddirection1\":\"东南风\",\"winddirection2\":\"东南风\",\"windleve1\":\"微风\",\"windleve2\":\"微风\",\"weather1img\":\"https://rescdn.apihz.cn/resimg/tianqi/yin.png\",\"weather2img\":\"https://rescdn.apihz.cn/resimg/tianqi/xiaoyu.png\"},\"weatherday5\":{\"date\":\"2026/03/30\",\"weather1\":\"小雨\",\"weather2\":\"多云\",\"wd1\":18,\"wd2\":11,\"winddirection1\":\"北风\",\"winddirection2\":\"东北风\",\"windleve1\":\"微风\",\"windleve2\":\"微风\",\"weather1img\":\"https://rescdn.apihz.cn/resimg/tianqi/xiaoyu.png\",\"weather2img\":\"https://rescdn.apihz.cn/resimg/tianqi/duoyun.png\"},\"weatherday6\":{\"date\":\"2026/03/31\",\"weather1\":\"阴\",\"weather2\":\"小雨\",\"wd1\":18,\"wd2\":10,\"winddirection1\":\"东北风\",\"winddirection2\":\"东风\",\"windleve1\":\"微风\",\"windleve2\":\"微风\",\"weather1img\":\"https://rescdn.apihz.cn/resimg/tianqi/yin.png\",\"weather2img\":\"https://rescdn.apihz.cn/resimg/tianqi/xiaoyu.png\"},\"weatherday7\":{\"date\":\"2026/04/01\",\"weather1\":\"多云\",\"weather2\":\"多云\",\"wd1\":21,\"wd2\":12,\"winddirection1\":\"东风\",\"winddirection2\":\"东南风\",\"windleve1\":\"微风\",\"windleve2\":\"微风\",\"weather1img\":\"https://rescdn.apihz.cn/resimg/tianqi/duoyun.png\",\"weather2img\":\"https://rescdn.apihz.cn/resimg/tianqi/duoyun.png\"}}]",
              "tool_call_id": "call_q8iy6WK32m89469hp4gukyWz",
              "name": "get_weather",
              "metadata": {
                  "versions": {
                      "@langchain/core": "1.1.36"
                  }
              },
              "additional_kwargs": {},
              "response_metadata": {},
              "id": "de5583d5-2340-4ab7-9805-0e315f86d6eb"
          }
      },
      {
          "lc": 1,
          "type": "constructor",
          "id": [
              "langchain_core",
              "messages",
              "ToolMessage"
          ],
          "kwargs": {
              "status": "success",
              "content": "{\"code\":400,\"msg\":\"查询失败，请重试，彩钻或炫钻会员可提高成功率！\"}",
              "tool_call_id": "call_ZswGLvQ2YvwzQbHL9PS97pmd",
              "name": "get_rain",
              "metadata": {
                  "versions": {
                      "@langchain/core": "1.1.36"
                  }
              },
              "additional_kwargs": {},
              "response_metadata": {},
              "id": "bc7bb16b-af85-4c52-894a-dab84b010377"
          }
      },
      {
          "lc": 1,
          "type": "constructor",
          "id": [
              "langchain_core",
              "messages",
              "AIMessage"
          ],
          "kwargs": {
              "id": "chatcmpl-DNaDYIjgzkDY55CC095ySj8BfhGYn",
              "name": "model",
              "content": "抱歉，我无法获取北京和上海之间的火车票余票情况的数据。这可能是因为查询失败或数据暂时不可用。然而，我已经获取了这两座城市的未来7天天气情况。\n\n### 北京未来7天天气情况\n\n1. **3月27日**: 多云，温度20°C到9°C，微风。\n2. **3月28日**: 阴转小雨，温度19°C到9°C，微风。\n3. **3月29日**: 晴转多云，温度22°C到7°C，北风3-4级。\n4. **3月30日**: 多云转阴，温度17°C到7°C，微风。\n5. **3月31日**: 阴转小雨，温度17°C到6°C，微风。\n6. **4月1日**: 晴转多云，温度18°C到4°C，北风3-4级。\n\n### 上海未来7天天气情况\n\n1. **3月27日**: 阴转晴，温度19°C到10°C，微风东风。\n2. **3月28日**: 多云转小雨，温度21°C到13°C，微风。\n3. **3月29日**: 阴转小雨，温度23°C到13°C，微风。\n4. **3月30日**: 小雨转多云，温度18°C到11°C，微风。\n5. **3月31日**: 阴转小雨，温度18°C到10°C，微风。\n6. **4月1日**: 多云，温度21°C到12°C，微风。\n\n### 旅行攻略建议\n\n- **出行建议**: 在制定前往北京和上海的旅行计划时，应提前预订火车票和酒店住宿，避免由于数据的不可用性而耽误行程。\n\n- **着装提示**: 根据天气情况，建议在北京旅行期间准备防风及雨具，尤其在多雨的日子注意携带雨伞和穿着舒适的鞋子。在上海，旅行者同样需要准备可能遇到的小雨，建议保持舒适的衣物，以便应对阴晴变化。\n\n- **景点推荐**: \n  - **北京**: 建议参观故宫、长城这些经典景点，尽量选择天气晴好的日子，以享受更好的风景。\n  - **上海**: 可以考虑外滩、豫园，特别是在周末时，享受上海的都市风情与老街巷。\n\n尽管火车票信息暂时不可用，您也可以通过实地或在线多方式尝试获取以确保旅行顺利。希望这能给您的旅程提供一些参考。",
              "additional_kwargs": {},
              "response_metadata": {
                  "tokenUsage": {
                      "promptTokens": 3119,
                      "completionTokens": 620,
                      "totalTokens": 3739
                  },
                  "finish_reason": "stop",
                  "model_provider": "openai",
                  "model_name": "gpt-4o",
                  "usage": {
                      "prompt_tokens": 3119,
                      "completion_tokens": 620,
                      "total_tokens": 3739,
                      "prompt_tokens_details": {
                          "cached_tokens": 0,
                          "audio_tokens": 0
                      },
                      "completion_tokens_details": {
                          "audio_tokens": 0,
                          "reasoning_tokens": 0,
                          "accepted_prediction_tokens": 0,
                          "rejected_prediction_tokens": 0
                      },
                      "input_tokens": 0,
                      "output_tokens": 0,
                      "input_tokens_details": null
                  },
                  "system_fingerprint": "fp_e9b9b028d7"
              },
              "type": "ai",
              "tool_calls": [],
              "invalid_tool_calls": [],
              "usage_metadata": {
                  "output_tokens": 620,
                  "input_tokens": 3119,
                  "total_tokens": 3739,
                  "input_token_details": {
                      "audio": 0,
                      "cache_read": 0
                  },
                  "output_token_details": {
                      "audio": 0,
                      "reasoning": 0
                  }
              }
          }
      }
  ]
}