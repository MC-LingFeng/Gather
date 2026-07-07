import { Button } from 'antd';
import React, { useState } from 'react'
import * as z from 'zod';
import { createAgent, tool } from 'langchain';


const LangChainPage = () => {
  const [showMessage, setShowMessage] = useState();

  const getWeather = tool(
    (input) => `It's always sunny in ${input.city}!`,
    {
      name: "get_weather",
      description: "Get the weather for a given city",
      schema: z.object({
        city: z.string().describe("The city to get the weather for"),
      }),
    }
  );

  console.log(createAgent, tool);
  
  // const agent = createAgent({
  //   model: "claude-sonnet-4-6",
  //   tools: [getWeather],
  // });

  return (
    <div>
      <Button onClick={async () => {
      }}>获取天气</Button>
      {showMessage && <div>{showMessage}</div>}
    </div>
  )
}

export default LangChainPage