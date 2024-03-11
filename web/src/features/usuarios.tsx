import React from 'react';
import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  List,
  minLength,
  PasswordInput, Show,
  SimpleForm, SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin';

import GroupIcon from '@mui/icons-material/Group';

const UsuarioList = () => {
  return (
    <List pagination={false}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="displayName"/>
        <TextField source="email"/>
        <EditButton/>
        <DeleteButton/>
      </Datagrid>
    </List>
  );
};

const UsuarioEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="displayName" fullWidth/>
        <TextInput source="email" fullWidth/>
      </SimpleForm>
    </Edit>
  );
};

const UsuarioCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="displayName" fullWidth/>
        <TextInput source="email" fullWidth/>
        <PasswordInput source="password" validate={[minLength(6)]}/>
      </SimpleForm>
    </Create>
  );
};

const UsuarioShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="displayName" />
        <TextField source="email" />
      </SimpleShowLayout>
    </Show>
  );
};

export default {
  name: 'usuarios',
  icon: GroupIcon,
  list: UsuarioList,
  create: UsuarioCreate,
  edit: UsuarioEdit,
  show: UsuarioShow
};
