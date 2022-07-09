import {Button, Heading, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";


const AdminCard = ({icon, title, description, navigateTo}) => {
  const navigate = useNavigate();

  return <>
    <Button
      role={'group'}
      p={6}
      maxW={'330px'}
      w={'full'}
      h={'full'}
      bg={useColorModeValue('whiteAlpha', 'gray.900')}
      boxShadow={'xl'}
      rounded={'lg'}
      pos={'relative'}
      onClick={() => {
        navigate(navigateTo)
      }}
    >
      <Stack align={'center'}>
        <Icon as={icon} w={10} h={10}/>
        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
          {title}
        </Heading>
        <Stack direction={'row'} align={'center'}>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            {description}
          </Text>
        </Stack>
      </Stack>
    </Button>
  </>;
}

export default AdminCard;