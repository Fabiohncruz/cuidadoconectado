import React from 'react';
import {
  ArrayField,
  ArrayInput,
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  DateField,
  DateInput,
  TimeInput,
  DeleteButton,
  Edit,
  EditButton,
  FunctionField,
  List,
  ReferenceField,
  Show,
  SimpleFormIterator,
  TabbedForm,
  TabbedShowLayout,
  TextField,
  TextInput,
  useGetIdentity,
} from 'react-admin';
import ElderlyIcon from '@mui/icons-material/Elderly';
import { Link, Typography } from '@mui/material';
import moment from 'moment';
import 'moment/locale/pt-br';

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
        <ReferenceField source="usuarioId" reference="usuarios">
          <TextField source="displayName" />
        </ReferenceField>
        <TextField source="nome" />
        <DateField source="dataNascimento" />
        <TextField source="codigoConexao" />
        <EditButton />
        <DeleteButton />
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
          <TextInput source="nome" />
          <DateInput source="dataNascimento" />
          <TextInput
            source="codigoConexao"
            helperText={
              'Utilize esse código para adicionar no novo dispositivo'
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

const PessoaEdit = () => {
  return (
    <Edit>
      <TabbedForm>
        <TabbedForm.Tab label="Informações">
          <TextInput source="nome" />
          <DateInput source="dataNascimento" />
          <TextInput
            source="codigoConexao"
            helperText={
              'Utilize esse código para adicionar no novo dispositivo'
            }
          />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Configurações">
          <BooleanInput source="config.bpm" />
          <BooleanInput source="config.gps" />
          <BooleanInput source="config.pressao" />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Medicamentos">
          <ArrayInput source="medicamentos">
            <SimpleFormIterator inline>
              <TextInput source="nome" helperText={false} />
              <TimeInput source="horario"
                helperText={false} />
            </SimpleFormIterator>
          </ArrayInput>
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};

const PessoaShow = () => {
  return <Show>
    <TabbedShowLayout>
      <TabbedShowLayout.Tab label="Informações">
        <TextField source="nome" />
        <DateField source="dataNascimento" />
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="Configurações">
        <BooleanField source="config.bpm" />
        <BooleanField source="config.gps" />
        <BooleanField source="config.pressao" />
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="Dispositivos">
        <TextField source="codigoConexao" />
        <ArrayField source="dispositivos">
          <Datagrid bulkActionButtons={false} empty={
            <Typography variant="body2">Nenhum dispositivo cadastrado</Typography>
          }>
            <TextField source="deviceId" />
            <BooleanField source="ativo" />
          </Datagrid>
        </ArrayField>
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="Medicamentos">
        <ArrayField label={false} source="medicamentos">
          <Datagrid bulkActionButtons={false} empty={
            <Typography variant="body2">Nenhum medicamento cadastrado</Typography>
          }>
            <TextField source="nome" />
            <DateField showDate={false} showTime={true} source="horario" />
          </Datagrid>
        </ArrayField>
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="Monitoramento">
        <ArrayField label={false} source="monitoramento.ultimaLeitura.dados">
          <Datagrid bulkActionButtons={false} empty={
            <Typography variant="body2">Nenhum dado registrado</Typography>
          }>
            <TextField label="Tipo da Leitura" source="type" />
            <FunctionField label="Valor" render={(dado) => {
              if (dado.type === 'bpm') {
                return <Typography>{JSON.stringify(dado.result?.[0]?.samples?.[0]?.beatsPerMinute)} BPM</Typography>;
              }
              if (dado.type === 'gps') {
                const latLong = `${dado.currentLocation.latitude},${dado.currentLocation.longitude}`;
                const url = `https://www.google.com/maps/place/${latLong}/${latLong}`;
                return <Typography component={Link} href={url} target="_blank">Ver no Maps</Typography>;
              }
              if (dado.type === 'pressao') {
                return <Typography>{dado.result[0]?.diastolic?.inMillimetersOfMercury}/{dado.result[0]?.systolic?.inMillimetersOfMercury}mmHg</Typography>;
              }
              return <Typography>{JSON.stringify(dado)}</Typography>;
            }} />
            <FunctionField label="Última Leitura" render={dado => {
              if (dado.type === 'bpm') {
                const timeAgo = moment(dado.result?.[0]?.samples?.[0]?.time).locale('pt-br').fromNow();
                return <Typography>{timeAgo}</Typography>;
              }
              if (dado.type === 'gps') {
                const timeAgo = moment(new Date(dado.currentLocation.time)).locale('pt-br').fromNow();
                return <Typography>{timeAgo}</Typography>;
              }
              if (dado.type === 'pressao') {
                const timeAgo = moment(new Date(dado.result[0]?.time)).locale('pt-br').fromNow();
                return <Typography>{timeAgo}</Typography>;
              }
              return <Typography>{JSON.stringify(dado)}</Typography>;
            }} />
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
