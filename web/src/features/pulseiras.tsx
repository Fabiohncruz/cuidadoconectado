import React from 'react';
import {
  BooleanField,
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  List,
  NumberField,
  ReferenceField,
  SimpleForm,
  TextField,
  TextInput,
  useGetIdentity,
} from 'react-admin';

function generateAlphaCode(length) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let alphaCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    alphaCode += alphabet[randomIndex];
  }

  return alphaCode;
}

const alphaCode = generateAlphaCode(6); // Altere o número para o comprimento desejado do código
console.log(alphaCode);


const PulseiraList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="id"/>
        <ReferenceField source="usuarioId" reference="usuarios">
          <TextField source="displayName"/>
        </ReferenceField>
        <TextField source="apelido"/>
        <BooleanField source="ativa"/>
        <NumberField source="deviceId"/>
        <EditButton/>
        <DeleteButton/>
      </Datagrid>
    </List>
  );
};

const PulseiraCreate = () => {
  const { data } = useGetIdentity();
  const mapUsuarioId = formData => ({
    ...formData,
    usuarioId: data.id,
  });
  return (
    <Create transform={mapUsuarioId}>
      <SimpleForm defaultValues={{
        codigoConexao: generateAlphaCode(6),
      }}>
        {/*<ReferenceInput source="usuarioId" reference="usuarios">*/}
        {/*  <SelectInput optionText="displayName"/>*/}
        {/*</ReferenceInput>*/}
        <TextInput source="apelido"/>
        <TextInput source="codigoConexao"
                   helperText={'Utilize esse código para adicionar no novo dispositivo'}/>
      </SimpleForm>
    </Create>
  );
};

const PulseiraEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id"/>
        <TextInput source="apelido"/>
        <TextInput source="codigoConexao" helperText={'Utilize esse código para adicionar no novo dispositivo'}/>
        <TextInput source="deviceId"/>
      </SimpleForm>
    </Edit>
  );
};

export default {
  list: PulseiraList,
  create: PulseiraCreate,
  edit: PulseiraEdit,
};
