import React from "react";
import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  DateField,
  DateInput,
  DeleteButton,
  Edit,
  EditButton,
  List,
  NumberField,
  ReferenceField,
  SimpleForm,
  TabbedForm,
  TextField,
  TextInput,
  useGetIdentity,
} from "react-admin";

function generateAlphaCode(length) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let alphaCode = "";

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
        <TextField source="id" />
        <ReferenceField source="usuarioId" reference="usuarios">
          <TextField source="displayName" />
        </ReferenceField>
        <TextField source="apelido" />
        <DateField source="dataNascimento" />
        <BooleanField source="ativa" />
        <NumberField source="deviceId" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

const PulseiraCreate = () => {
  const { data } = useGetIdentity();
  const mapUsuarioId = (formData) => ({
    ...formData,
    usuarioId: data.id,
  });
  return (
    <Create transform={mapUsuarioId}>
      <TabbedForm
        defaultValues={{
          codigoConexao: generateAlphaCode(6),
        }}
      >
        <TabbedForm.Tab label="Informações">
          <TextInput source="apelido" />
          <DateInput source="dataNascimento" />
          <TextInput
            source="codigoConexao"
            helperText={
              "Utilize esse código para adicionar no novo dispositivo"
            }
          />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Configurações">
          <BooleanInput source="config.bpm" />
          <BooleanInput source="config.gps" />
          <BooleanInput source="config.pressao" />
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  );
};

const PulseiraEdit = () => {
  return (
    <Edit>
      <TabbedForm>
        <TabbedForm.Tab label="Informações">
          <TextInput source="apelido" />
          <DateInput source="dataNascimento" />
          <TextInput
            source="codigoConexao"
            helperText={
              "Utilize esse código para adicionar no novo dispositivo"
            }
          />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Configurações">
          <BooleanInput source="config.bpm" />
          <BooleanInput source="config.gps" />
          <BooleanInput source="config.pressao" />
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};

export default {
  list: PulseiraList,
  create: PulseiraCreate,
  edit: PulseiraEdit,
};
