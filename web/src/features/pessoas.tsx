import React from 'react';
import {
  ArrayField,
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
  ReferenceField,
  Show,
  TabbedForm,
  TabbedShowLayout,
  TextField,
  TextInput,
  useGetIdentity,
} from 'react-admin';
import ElderlyIcon from '@mui/icons-material/Elderly';
import { Typography } from '@mui/material';

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

const PessoaList = () => {
  return (
    <List pagination={false}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id"/>
        <ReferenceField source="usuarioId" reference="usuarios">
          <TextField source="displayName"/>
        </ReferenceField>
        <TextField source="nome"/>
        <DateField source="dataNascimento"/>
        <TextField source="codigoConexao" />
        <EditButton/>
        <DeleteButton/>
      </Datagrid>
    </List>
  );
};

const PessoaCreate = () => {
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
          <TextInput source="nome"/>
          <DateInput source="dataNascimento"/>
          <TextInput
            source="codigoConexao"
            helperText={
              'Utilize esse código para adicionar no novo dispositivo'
            }
          />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Configurações">
          <BooleanInput source="config.bpm"/>
          <BooleanInput source="config.gps"/>
          <BooleanInput source="config.pressao"/>
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  );
};

const PessoaEdit = () => {
  return (
    <Edit>
      <TabbedForm>
        <TabbedForm.Tab label="Informações">
          <TextInput source="nome"/>
          <DateInput source="dataNascimento"/>
          <TextInput
            source="codigoConexao"
            helperText={
              'Utilize esse código para adicionar no novo dispositivo'
            }
          />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Configurações">
          <BooleanInput source="config.bpm"/>
          <BooleanInput source="config.gps"/>
          <BooleanInput source="config.pressao"/>
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};

const PessoaShow = () => {
  return <Show>
    <TabbedShowLayout>
      <TabbedShowLayout.Tab label="Informações">
        <TextField source="nome"/>
        <DateField source="dataNascimento"/>
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="Configurações">
        <BooleanField source="config.bpm"/>
        <BooleanField source="config.gps"/>
        <BooleanField source="config.pressao"/>
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="Dispositivos">
        <TextField source="codigoConexao"/>
        <ArrayField source="dispositivos">
          <Datagrid bulkActionButtons={false} empty={
            <Typography variant="body2">Nenhum dispositivo cadastrado</Typography>
          }>
            <TextField source="deviceId"/>
            <BooleanField source="ativo"/>
          </Datagrid>
        </ArrayField>
      </TabbedShowLayout.Tab>
    </TabbedShowLayout>
  </Show>;
};

export default {
  name: 'pessoas',
  icon: ElderlyIcon,
  list: PessoaList,
  create: PessoaCreate,
  edit: PessoaEdit,
  show: PessoaShow,
};
