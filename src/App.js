import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  Heading,
  HStack,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import MyButton  from './MyButton.js';

import { evaluate } from "mathjs";

let math = [];
let nextOp = false;

function App() {
  const [number, setNumber] = useState("0");
  const [operand, setOperand] = useState("");
  const [lastNumber, setLastNumber] = useState("0");

  const result = () => {
    if (math.length > 0 && operand !== "") {
      if (math[math.length - 1][0] >= 0 && math[math.length - 1][0] <= 9) {
        math = [...math, operand, lastNumber]
      } else {
        setLastNumber(number);
        math = [...math, number]
      }
      setNumber(evaluate(math.join("")).toString());
      nextOp = true
    }
  };

  const handler = (x) => {
    switch (x) {
      case "sqrt":
        number[0] !== "-" && setNumber(evaluate(`sqrt(${number})`).toFixed(8).toString())
        break;
      case "+/-":
        if (number[0] === "0") break
        number[0] === "-" ? setNumber(number.slice(1, number.length)) : setNumber(`-${number}`)
        break;
      case ".":
        !number.includes('.') && setNumber(number + x)
        break;
      default:
        if (typeof x == "number") {
          number === "0" ? setNumber(x.toString()) : setNumber(number + x)
        }
        else {
          if (nextOp) math = []
          nextOp = false
          setOperand(x)
          math = [...math, number, x]
          setNumber("0")
        }
        break;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack>
            <Heading size="3xl"> Калькулятор </Heading>
            <Text fontSize="4xl">{math.join("")}</Text>
            <Text fontSize="4xl" pb="100px">{number}</Text>
            <HStack>
              <MyButton onClick={() => handler("sqrt")}>sqrt</MyButton>
              <MyButton onClick={() => setNumber(number.slice(0, -1))}>DEL</MyButton>
              <MyButton onClick={() => {
                setNumber("0")
                math = []
              }}>C</MyButton>
              <MyButton onClick={() => handler("/")}>/</MyButton>
            </HStack>
            <HStack>
              <MyButton onClick={() => handler(7)}>7</MyButton>
              <MyButton onClick={() => handler(8)}>8</MyButton>
              <MyButton onClick={() => handler(9)}>9</MyButton>
              <MyButton onClick={() => handler("*")}>x</MyButton>
            </HStack>
            <HStack>
              <MyButton onClick={() => handler(4)}>4</MyButton>
              <MyButton onClick={() => handler(5)}>5</MyButton>
              <MyButton onClick={() => handler(6)}>6</MyButton>
              <MyButton onClick={() => handler("-")}>-</MyButton>
            </HStack>
            <HStack>
              <MyButton onClick={() => handler(1)}>1</MyButton>
              <MyButton onClick={() => handler(2)}>2</MyButton>
              <MyButton onClick={() => handler(3)}>3</MyButton>
              <MyButton onClick={() => handler("+")}>+</MyButton>
            </HStack>
            <HStack>
              <MyButton onClick={() => handler("+/-")}>+/-</MyButton>
              <MyButton onClick={() => handler(0)}>0</MyButton>
              <MyButton onClick={() => handler(".")}>,</MyButton>
              <MyButton onClick={() => result()}>=</MyButton>
            </HStack>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
