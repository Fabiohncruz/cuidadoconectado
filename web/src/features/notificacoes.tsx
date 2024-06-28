
import React from 'react';
import {
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  List,
  TextField
} from 'react-admin';

import { NotificationImportant } from '@mui/icons-material';

const NotificacaoList = () => {
  return (
    <List pagination={false}>
      <Datagrid bulkActionButtons={false}>
        <DateField showTime source="time"/>
        <TextField source="descricao"/>
      </Datagrid>
    </List>
  );
};


export default {
  name: 'notificacoes',
  icon: NotificationImportant,
  list: NotificacaoList,
};
