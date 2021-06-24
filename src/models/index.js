// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Event, Session, Presenter, Hall, Stage, Table, PresenterSocialMedia, User, UserEventGroup, UserEventJoin, TrueChatRoom, TrueChatMessage, UserClientJoin, Client, Setting } = initSchema(schema);

export {
  Event,
  Session,
  Presenter,
  Hall,
  Stage,
  Table,
  PresenterSocialMedia,
  User,
  UserEventGroup,
  UserEventJoin,
  TrueChatRoom,
  TrueChatMessage,
  UserClientJoin,
  Client,
  Setting
};