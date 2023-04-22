import React from 'react'

import { Button } from '@chakra-ui/react'


function MyButton(props) {
  return (
    <Button
     size='md'
     height='70px'
     width='70px'
     onClick={props.onClick}
    >
        {props.children}
    </Button>
  )
}

export default MyButton

