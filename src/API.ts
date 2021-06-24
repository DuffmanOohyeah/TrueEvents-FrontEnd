/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateEventInput = {
  id?: string | null,
  client_id: string,
  event_name: string,
  event_logo?: string | null,
  event_desc?: string | null,
  start_date?: string | null,
  end_date?: string | null,
  timezone_abbr?: string | null,
  primary_domain?: string | null,
  other_domains?: Array< string | null > | null,
  address?: string | null,
  city?: string | null,
  county?: string | null,
  country?: string | null,
  archived?: boolean | null,
  archive_date?: string | null,
};

export type ModelEventConditionInput = {
  client_id?: ModelIDInput | null,
  event_name?: ModelStringInput | null,
  event_logo?: ModelStringInput | null,
  event_desc?: ModelStringInput | null,
  start_date?: ModelStringInput | null,
  end_date?: ModelStringInput | null,
  timezone_abbr?: ModelStringInput | null,
  primary_domain?: ModelStringInput | null,
  other_domains?: ModelStringInput | null,
  address?: ModelStringInput | null,
  city?: ModelStringInput | null,
  county?: ModelStringInput | null,
  country?: ModelStringInput | null,
  archived?: ModelBooleanInput | null,
  archive_date?: ModelStringInput | null,
  and?: Array< ModelEventConditionInput | null > | null,
  or?: Array< ModelEventConditionInput | null > | null,
  not?: ModelEventConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Event = {
  __typename: "Event",
  id?: string,
  client_id?: string,
  event_name?: string,
  event_logo?: string | null,
  event_desc?: string | null,
  start_date?: string | null,
  end_date?: string | null,
  timezone_abbr?: string | null,
  primary_domain?: string | null,
  other_domains?: Array< string | null > | null,
  address?: string | null,
  city?: string | null,
  county?: string | null,
  country?: string | null,
  archived?: boolean | null,
  archive_date?: string | null,
  sessions?: ModelSessionConnection,
  tables?: ModelTableConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelSessionConnection = {
  __typename: "ModelSessionConnection",
  items?:  Array<Session | null > | null,
  nextToken?: string | null,
};

export type Session = {
  __typename: "Session",
  id?: string,
  event_id?: string,
  session_name?: string,
  session_desc?: string | null,
  start_date?: string | null,
  end_date?: string | null,
  presenters?: ModelPresenterConnection,
  hall?: Hall,
  stages?: ModelStageConnection,
  webinars?: ModelWebinarConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelPresenterConnection = {
  __typename: "ModelPresenterConnection",
  items?:  Array<Presenter | null > | null,
  nextToken?: string | null,
};

export type Presenter = {
  __typename: "Presenter",
  id?: string,
  session_id?: string,
  title?: string | null,
  first_name?: string,
  last_name?: string,
  email?: string | null,
  company?: string | null,
  profile_img?: string | null,
  social_medias?: ModelPresenterSocialMediaConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelPresenterSocialMediaConnection = {
  __typename: "ModelPresenterSocialMediaConnection",
  items?:  Array<PresenterSocialMedia | null > | null,
  nextToken?: string | null,
};

export type PresenterSocialMedia = {
  __typename: "PresenterSocialMedia",
  id?: string,
  presenter_id?: string,
  site?: string,
  link?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type Hall = {
  __typename: "Hall",
  id?: string,
  hall_name?: string,
  hall_desc?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelStageConnection = {
  __typename: "ModelStageConnection",
  items?:  Array<Stage | null > | null,
  nextToken?: string | null,
};

export type Stage = {
  __typename: "Stage",
  id?: string,
  session_id?: string,
  stage_name?: string,
  stage_desc?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelWebinarConnection = {
  __typename: "ModelWebinarConnection",
  items?:  Array<Webinar | null > | null,
  nextToken?: string | null,
};

export type Webinar = {
  __typename: "Webinar",
  id?: string,
  session_id?: string,
  webinar_name?: string,
  webinar_desc?: string | null,
  webinar_type?: string | null,
  webinar_api_key?: string | null,
  webinar_url?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelTableConnection = {
  __typename: "ModelTableConnection",
  items?:  Array<Table | null > | null,
  nextToken?: string | null,
};

export type Table = {
  __typename: "Table",
  id?: string,
  event_id?: string,
  table_name?: string,
  capacity?: number | null,
  table_logo?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateEventInput = {
  id: string,
  client_id?: string | null,
  event_name?: string | null,
  event_logo?: string | null,
  event_desc?: string | null,
  start_date?: string | null,
  end_date?: string | null,
  timezone_abbr?: string | null,
  primary_domain?: string | null,
  other_domains?: Array< string | null > | null,
  address?: string | null,
  city?: string | null,
  county?: string | null,
  country?: string | null,
  archived?: boolean | null,
  archive_date?: string | null,
};

export type DeleteEventInput = {
  id?: string | null,
};

export type CreateSessionInput = {
  id?: string | null,
  event_id: string,
  session_name: string,
  session_desc?: string | null,
  start_date?: string | null,
  end_date?: string | null,
  sessionHallId?: string | null,
};

export type ModelSessionConditionInput = {
  event_id?: ModelIDInput | null,
  session_name?: ModelStringInput | null,
  session_desc?: ModelStringInput | null,
  start_date?: ModelStringInput | null,
  end_date?: ModelStringInput | null,
  and?: Array< ModelSessionConditionInput | null > | null,
  or?: Array< ModelSessionConditionInput | null > | null,
  not?: ModelSessionConditionInput | null,
};

export type UpdateSessionInput = {
  id: string,
  event_id?: string | null,
  session_name?: string | null,
  session_desc?: string | null,
  start_date?: string | null,
  end_date?: string | null,
  sessionHallId?: string | null,
};

export type DeleteSessionInput = {
  id?: string | null,
};

export type CreatePresenterInput = {
  id?: string | null,
  session_id: string,
  title?: string | null,
  first_name: string,
  last_name: string,
  email?: string | null,
  company?: string | null,
  profile_img?: string | null,
};

export type ModelPresenterConditionInput = {
  session_id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  first_name?: ModelStringInput | null,
  last_name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  company?: ModelStringInput | null,
  profile_img?: ModelStringInput | null,
  and?: Array< ModelPresenterConditionInput | null > | null,
  or?: Array< ModelPresenterConditionInput | null > | null,
  not?: ModelPresenterConditionInput | null,
};

export type UpdatePresenterInput = {
  id: string,
  session_id?: string | null,
  title?: string | null,
  first_name?: string | null,
  last_name?: string | null,
  email?: string | null,
  company?: string | null,
  profile_img?: string | null,
};

export type DeletePresenterInput = {
  id?: string | null,
};

export type CreateTableInput = {
  id?: string | null,
  event_id: string,
  table_name: string,
  capacity?: number | null,
  table_logo?: string | null,
};

export type ModelTableConditionInput = {
  event_id?: ModelIDInput | null,
  table_name?: ModelStringInput | null,
  capacity?: ModelIntInput | null,
  table_logo?: ModelStringInput | null,
  and?: Array< ModelTableConditionInput | null > | null,
  or?: Array< ModelTableConditionInput | null > | null,
  not?: ModelTableConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateTableInput = {
  id: string,
  event_id?: string | null,
  table_name?: string | null,
  capacity?: number | null,
  table_logo?: string | null,
};

export type DeleteTableInput = {
  id?: string | null,
};

export type CreateHallInput = {
  id?: string | null,
  hall_name: string,
  hall_desc?: string | null,
};

export type ModelHallConditionInput = {
  hall_name?: ModelStringInput | null,
  hall_desc?: ModelStringInput | null,
  and?: Array< ModelHallConditionInput | null > | null,
  or?: Array< ModelHallConditionInput | null > | null,
  not?: ModelHallConditionInput | null,
};

export type UpdateHallInput = {
  id: string,
  hall_name?: string | null,
  hall_desc?: string | null,
};

export type DeleteHallInput = {
  id?: string | null,
};

export type CreateStageInput = {
  id?: string | null,
  session_id: string,
  stage_name: string,
  stage_desc?: string | null,
};

export type ModelStageConditionInput = {
  session_id?: ModelIDInput | null,
  stage_name?: ModelStringInput | null,
  stage_desc?: ModelStringInput | null,
  and?: Array< ModelStageConditionInput | null > | null,
  or?: Array< ModelStageConditionInput | null > | null,
  not?: ModelStageConditionInput | null,
};

export type UpdateStageInput = {
  id: string,
  session_id?: string | null,
  stage_name?: string | null,
  stage_desc?: string | null,
};

export type DeleteStageInput = {
  id?: string | null,
};

export type CreateWebinarInput = {
  id?: string | null,
  session_id: string,
  webinar_name: string,
  webinar_desc?: string | null,
  webinar_type?: string | null,
  webinar_api_key?: string | null,
  webinar_url?: string | null,
};

export type ModelWebinarConditionInput = {
  session_id?: ModelIDInput | null,
  webinar_name?: ModelStringInput | null,
  webinar_desc?: ModelStringInput | null,
  webinar_type?: ModelStringInput | null,
  webinar_api_key?: ModelStringInput | null,
  webinar_url?: ModelStringInput | null,
  and?: Array< ModelWebinarConditionInput | null > | null,
  or?: Array< ModelWebinarConditionInput | null > | null,
  not?: ModelWebinarConditionInput | null,
};

export type UpdateWebinarInput = {
  id: string,
  session_id?: string | null,
  webinar_name?: string | null,
  webinar_desc?: string | null,
  webinar_type?: string | null,
  webinar_api_key?: string | null,
  webinar_url?: string | null,
};

export type DeleteWebinarInput = {
  id?: string | null,
};

export type CreatePresenterSocialMediaInput = {
  id?: string | null,
  presenter_id: string,
  site: string,
  link?: string | null,
};

export type ModelPresenterSocialMediaConditionInput = {
  presenter_id?: ModelIDInput | null,
  site?: ModelStringInput | null,
  link?: ModelStringInput | null,
  and?: Array< ModelPresenterSocialMediaConditionInput | null > | null,
  or?: Array< ModelPresenterSocialMediaConditionInput | null > | null,
  not?: ModelPresenterSocialMediaConditionInput | null,
};

export type UpdatePresenterSocialMediaInput = {
  id: string,
  presenter_id?: string | null,
  site?: string | null,
  link?: string | null,
};

export type DeletePresenterSocialMediaInput = {
  id?: string | null,
};

export type CreateUserInput = {
  id?: string | null,
  cognito_sub: string,
  title?: string | null,
  first_name?: string | null,
  last_name?: string | null,
  job_title?: string | null,
  profile_img?: string | null,
  ignore?: string | null,
};

export type ModelUserConditionInput = {
  cognito_sub?: ModelIDInput | null,
  title?: ModelStringInput | null,
  first_name?: ModelStringInput | null,
  last_name?: ModelStringInput | null,
  job_title?: ModelStringInput | null,
  profile_img?: ModelStringInput | null,
  ignore?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id?: string,
  cognito_sub?: string,
  title?: string | null,
  first_name?: string | null,
  last_name?: string | null,
  job_title?: string | null,
  profile_img?: string | null,
  ignore?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateUserInput = {
  id: string,
  cognito_sub?: string | null,
  title?: string | null,
  first_name?: string | null,
  last_name?: string | null,
  job_title?: string | null,
  profile_img?: string | null,
  ignore?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateUserEventGroupInput = {
  id?: string | null,
  join_id: string,
  name: string,
  active?: boolean | null,
};

export type ModelUserEventGroupConditionInput = {
  join_id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  and?: Array< ModelUserEventGroupConditionInput | null > | null,
  or?: Array< ModelUserEventGroupConditionInput | null > | null,
  not?: ModelUserEventGroupConditionInput | null,
};

export type UserEventGroup = {
  __typename: "UserEventGroup",
  id?: string,
  join_id?: string,
  name?: string,
  active?: boolean | null,
  user?: UserEventJoin,
  createdAt?: string,
  updatedAt?: string,
};

export type UserEventJoin = {
  __typename: "UserEventJoin",
  id?: string,
  cognito_sub?: string,
  client_id?: string,
  event?: Event,
  groups?: ModelUserEventGroupConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelUserEventGroupConnection = {
  __typename: "ModelUserEventGroupConnection",
  items?:  Array<UserEventGroup | null > | null,
  nextToken?: string | null,
};

export type UpdateUserEventGroupInput = {
  id: string,
  join_id?: string | null,
  name?: string | null,
  active?: boolean | null,
};

export type DeleteUserEventGroupInput = {
  id?: string | null,
};

export type CreateUserEventJoinInput = {
  id?: string | null,
  cognito_sub: string,
  client_id: string,
  userEventJoinEventId?: string | null,
};

export type ModelUserEventJoinConditionInput = {
  cognito_sub?: ModelIDInput | null,
  client_id?: ModelIDInput | null,
  and?: Array< ModelUserEventJoinConditionInput | null > | null,
  or?: Array< ModelUserEventJoinConditionInput | null > | null,
  not?: ModelUserEventJoinConditionInput | null,
};

export type UpdateUserEventJoinInput = {
  id: string,
  cognito_sub?: string | null,
  client_id?: string | null,
  userEventJoinEventId?: string | null,
};

export type DeleteUserEventJoinInput = {
  id?: string | null,
};

export type CreateTrueChatRoomInput = {
  id?: string | null,
  room_name: string,
};

export type ModelTrueChatRoomConditionInput = {
  room_name?: ModelStringInput | null,
  and?: Array< ModelTrueChatRoomConditionInput | null > | null,
  or?: Array< ModelTrueChatRoomConditionInput | null > | null,
  not?: ModelTrueChatRoomConditionInput | null,
};

export type TrueChatRoom = {
  __typename: "TrueChatRoom",
  id?: string,
  room_name?: string,
  messages?: ModelTrueChatMessageConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelTrueChatMessageConnection = {
  __typename: "ModelTrueChatMessageConnection",
  items?:  Array<TrueChatMessage | null > | null,
  nextToken?: string | null,
};

export type TrueChatMessage = {
  __typename: "TrueChatMessage",
  id?: string,
  cognito_sub?: string,
  room_id?: string,
  message?: string,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateTrueChatRoomInput = {
  id: string,
  room_name?: string | null,
};

export type DeleteTrueChatRoomInput = {
  id?: string | null,
};

export type CreateTrueChatMessageInput = {
  id?: string | null,
  cognito_sub: string,
  room_id: string,
  message: string,
};

export type ModelTrueChatMessageConditionInput = {
  cognito_sub?: ModelIDInput | null,
  room_id?: ModelIDInput | null,
  message?: ModelStringInput | null,
  and?: Array< ModelTrueChatMessageConditionInput | null > | null,
  or?: Array< ModelTrueChatMessageConditionInput | null > | null,
  not?: ModelTrueChatMessageConditionInput | null,
};

export type UpdateTrueChatMessageInput = {
  id: string,
  cognito_sub?: string | null,
  room_id?: string | null,
  message?: string | null,
};

export type DeleteTrueChatMessageInput = {
  id?: string | null,
};

export type CreateFavouriteInput = {
  id?: string | null,
  cognito_sub: string,
  client_id: string,
  event_id: string,
  session_id?: string | null,
  presenter_id?: string | null,
  attendee_cognito_sub?: string | null,
};

export type ModelFavouriteConditionInput = {
  cognito_sub?: ModelIDInput | null,
  client_id?: ModelIDInput | null,
  event_id?: ModelIDInput | null,
  session_id?: ModelIDInput | null,
  presenter_id?: ModelIDInput | null,
  attendee_cognito_sub?: ModelIDInput | null,
  and?: Array< ModelFavouriteConditionInput | null > | null,
  or?: Array< ModelFavouriteConditionInput | null > | null,
  not?: ModelFavouriteConditionInput | null,
};

export type Favourite = {
  __typename: "Favourite",
  id?: string,
  cognito_sub?: string,
  client_id?: string,
  event_id?: string,
  session_id?: string | null,
  presenter_id?: string | null,
  attendee_cognito_sub?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateFavouriteInput = {
  id: string,
  cognito_sub?: string | null,
  client_id?: string | null,
  event_id?: string | null,
  session_id?: string | null,
  presenter_id?: string | null,
  attendee_cognito_sub?: string | null,
};

export type DeleteFavouriteInput = {
  id?: string | null,
};

export type CreateUserClientJoinInput = {
  id?: string | null,
  cognito_sub: string,
  userClientJoinClientId?: string | null,
};

export type ModelUserClientJoinConditionInput = {
  cognito_sub?: ModelIDInput | null,
  and?: Array< ModelUserClientJoinConditionInput | null > | null,
  or?: Array< ModelUserClientJoinConditionInput | null > | null,
  not?: ModelUserClientJoinConditionInput | null,
};

export type UserClientJoin = {
  __typename: "UserClientJoin",
  id?: string,
  cognito_sub?: string,
  client?: Client,
  createdAt?: string,
  updatedAt?: string,
};

export type Client = {
  __typename: "Client",
  id?: string,
  join_id?: string,
  full_name?: string,
  friendly_name?: string,
  clientdb_instance?: string | null,
  address?: string | null,
  county?: string | null,
  country?: string | null,
  logo?: string | null,
  join_date?: string | null,
  archived?: boolean | null,
  archive_date?: string | null,
  primary_contact?: string | null,
  contact_email?: string | null,
  contact_phone?: string | null,
  account_manager?: string | null,
  user?: UserClientJoin,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateUserClientJoinInput = {
  id: string,
  cognito_sub?: string | null,
  userClientJoinClientId?: string | null,
};

export type DeleteUserClientJoinInput = {
  id?: string | null,
};

export type CreateClientInput = {
  id?: string | null,
  join_id: string,
  full_name: string,
  friendly_name: string,
  clientdb_instance?: string | null,
  address?: string | null,
  county?: string | null,
  country?: string | null,
  logo?: string | null,
  join_date?: string | null,
  archived?: boolean | null,
  archive_date?: string | null,
  primary_contact?: string | null,
  contact_email?: string | null,
  contact_phone?: string | null,
  account_manager?: string | null,
};

export type ModelClientConditionInput = {
  join_id?: ModelIDInput | null,
  full_name?: ModelStringInput | null,
  friendly_name?: ModelStringInput | null,
  clientdb_instance?: ModelStringInput | null,
  address?: ModelStringInput | null,
  county?: ModelStringInput | null,
  country?: ModelStringInput | null,
  logo?: ModelStringInput | null,
  join_date?: ModelStringInput | null,
  archived?: ModelBooleanInput | null,
  archive_date?: ModelStringInput | null,
  primary_contact?: ModelStringInput | null,
  contact_email?: ModelStringInput | null,
  contact_phone?: ModelStringInput | null,
  account_manager?: ModelStringInput | null,
  and?: Array< ModelClientConditionInput | null > | null,
  or?: Array< ModelClientConditionInput | null > | null,
  not?: ModelClientConditionInput | null,
};

export type UpdateClientInput = {
  id: string,
  join_id?: string | null,
  full_name?: string | null,
  friendly_name?: string | null,
  clientdb_instance?: string | null,
  address?: string | null,
  county?: string | null,
  country?: string | null,
  logo?: string | null,
  join_date?: string | null,
  archived?: boolean | null,
  archive_date?: string | null,
  primary_contact?: string | null,
  contact_email?: string | null,
  contact_phone?: string | null,
  account_manager?: string | null,
};

export type DeleteClientInput = {
  id?: string | null,
};

export type CreateSettingInput = {
  id?: string | null,
  setting: string,
  value?: string | null,
};

export type ModelSettingConditionInput = {
  setting?: ModelStringInput | null,
  value?: ModelStringInput | null,
  and?: Array< ModelSettingConditionInput | null > | null,
  or?: Array< ModelSettingConditionInput | null > | null,
  not?: ModelSettingConditionInput | null,
};

export type Setting = {
  __typename: "Setting",
  id?: string,
  setting?: string,
  value?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateSettingInput = {
  id: string,
  setting?: string | null,
  value?: string | null,
};

export type DeleteSettingInput = {
  id?: string | null,
};

export type ModelEventFilterInput = {
  id?: ModelIDInput | null,
  client_id?: ModelIDInput | null,
  event_name?: ModelStringInput | null,
  event_logo?: ModelStringInput | null,
  event_desc?: ModelStringInput | null,
  start_date?: ModelStringInput | null,
  end_date?: ModelStringInput | null,
  timezone_abbr?: ModelStringInput | null,
  primary_domain?: ModelStringInput | null,
  other_domains?: ModelStringInput | null,
  address?: ModelStringInput | null,
  city?: ModelStringInput | null,
  county?: ModelStringInput | null,
  country?: ModelStringInput | null,
  archived?: ModelBooleanInput | null,
  archive_date?: ModelStringInput | null,
  and?: Array< ModelEventFilterInput | null > | null,
  or?: Array< ModelEventFilterInput | null > | null,
  not?: ModelEventFilterInput | null,
};

export type ModelEventConnection = {
  __typename: "ModelEventConnection",
  items?:  Array<Event | null > | null,
  nextToken?: string | null,
};

export type ModelSessionFilterInput = {
  id?: ModelIDInput | null,
  event_id?: ModelIDInput | null,
  session_name?: ModelStringInput | null,
  session_desc?: ModelStringInput | null,
  start_date?: ModelStringInput | null,
  end_date?: ModelStringInput | null,
  and?: Array< ModelSessionFilterInput | null > | null,
  or?: Array< ModelSessionFilterInput | null > | null,
  not?: ModelSessionFilterInput | null,
};

export type ModelPresenterFilterInput = {
  id?: ModelIDInput | null,
  session_id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  first_name?: ModelStringInput | null,
  last_name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  company?: ModelStringInput | null,
  profile_img?: ModelStringInput | null,
  and?: Array< ModelPresenterFilterInput | null > | null,
  or?: Array< ModelPresenterFilterInput | null > | null,
  not?: ModelPresenterFilterInput | null,
};

export type ModelTableFilterInput = {
  id?: ModelIDInput | null,
  event_id?: ModelIDInput | null,
  table_name?: ModelStringInput | null,
  capacity?: ModelIntInput | null,
  table_logo?: ModelStringInput | null,
  and?: Array< ModelTableFilterInput | null > | null,
  or?: Array< ModelTableFilterInput | null > | null,
  not?: ModelTableFilterInput | null,
};

export type ModelHallFilterInput = {
  id?: ModelIDInput | null,
  hall_name?: ModelStringInput | null,
  hall_desc?: ModelStringInput | null,
  and?: Array< ModelHallFilterInput | null > | null,
  or?: Array< ModelHallFilterInput | null > | null,
  not?: ModelHallFilterInput | null,
};

export type ModelHallConnection = {
  __typename: "ModelHallConnection",
  items?:  Array<Hall | null > | null,
  nextToken?: string | null,
};

export type ModelStageFilterInput = {
  id?: ModelIDInput | null,
  session_id?: ModelIDInput | null,
  stage_name?: ModelStringInput | null,
  stage_desc?: ModelStringInput | null,
  and?: Array< ModelStageFilterInput | null > | null,
  or?: Array< ModelStageFilterInput | null > | null,
  not?: ModelStageFilterInput | null,
};

export type ModelWebinarFilterInput = {
  id?: ModelIDInput | null,
  session_id?: ModelIDInput | null,
  webinar_name?: ModelStringInput | null,
  webinar_desc?: ModelStringInput | null,
  webinar_type?: ModelStringInput | null,
  webinar_api_key?: ModelStringInput | null,
  webinar_url?: ModelStringInput | null,
  and?: Array< ModelWebinarFilterInput | null > | null,
  or?: Array< ModelWebinarFilterInput | null > | null,
  not?: ModelWebinarFilterInput | null,
};

export type ModelPresenterSocialMediaFilterInput = {
  id?: ModelIDInput | null,
  presenter_id?: ModelIDInput | null,
  site?: ModelStringInput | null,
  link?: ModelStringInput | null,
  and?: Array< ModelPresenterSocialMediaFilterInput | null > | null,
  or?: Array< ModelPresenterSocialMediaFilterInput | null > | null,
  not?: ModelPresenterSocialMediaFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  cognito_sub?: ModelIDInput | null,
  title?: ModelStringInput | null,
  first_name?: ModelStringInput | null,
  last_name?: ModelStringInput | null,
  job_title?: ModelStringInput | null,
  profile_img?: ModelStringInput | null,
  ignore?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
};

export type ModelUserEventGroupFilterInput = {
  id?: ModelIDInput | null,
  join_id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  and?: Array< ModelUserEventGroupFilterInput | null > | null,
  or?: Array< ModelUserEventGroupFilterInput | null > | null,
  not?: ModelUserEventGroupFilterInput | null,
};

export type ModelUserEventJoinFilterInput = {
  id?: ModelIDInput | null,
  cognito_sub?: ModelIDInput | null,
  client_id?: ModelIDInput | null,
  and?: Array< ModelUserEventJoinFilterInput | null > | null,
  or?: Array< ModelUserEventJoinFilterInput | null > | null,
  not?: ModelUserEventJoinFilterInput | null,
};

export type ModelUserEventJoinConnection = {
  __typename: "ModelUserEventJoinConnection",
  items?:  Array<UserEventJoin | null > | null,
  nextToken?: string | null,
};

export type ModelTrueChatRoomFilterInput = {
  id?: ModelIDInput | null,
  room_name?: ModelStringInput | null,
  and?: Array< ModelTrueChatRoomFilterInput | null > | null,
  or?: Array< ModelTrueChatRoomFilterInput | null > | null,
  not?: ModelTrueChatRoomFilterInput | null,
};

export type ModelTrueChatRoomConnection = {
  __typename: "ModelTrueChatRoomConnection",
  items?:  Array<TrueChatRoom | null > | null,
  nextToken?: string | null,
};

export type ModelTrueChatMessageFilterInput = {
  id?: ModelIDInput | null,
  cognito_sub?: ModelIDInput | null,
  room_id?: ModelIDInput | null,
  message?: ModelStringInput | null,
  and?: Array< ModelTrueChatMessageFilterInput | null > | null,
  or?: Array< ModelTrueChatMessageFilterInput | null > | null,
  not?: ModelTrueChatMessageFilterInput | null,
};

export type ModelFavouriteFilterInput = {
  id?: ModelIDInput | null,
  cognito_sub?: ModelIDInput | null,
  client_id?: ModelIDInput | null,
  event_id?: ModelIDInput | null,
  session_id?: ModelIDInput | null,
  presenter_id?: ModelIDInput | null,
  attendee_cognito_sub?: ModelIDInput | null,
  and?: Array< ModelFavouriteFilterInput | null > | null,
  or?: Array< ModelFavouriteFilterInput | null > | null,
  not?: ModelFavouriteFilterInput | null,
};

export type ModelFavouriteConnection = {
  __typename: "ModelFavouriteConnection",
  items?:  Array<Favourite | null > | null,
  nextToken?: string | null,
};

export type ModelUserClientJoinFilterInput = {
  id?: ModelIDInput | null,
  cognito_sub?: ModelIDInput | null,
  and?: Array< ModelUserClientJoinFilterInput | null > | null,
  or?: Array< ModelUserClientJoinFilterInput | null > | null,
  not?: ModelUserClientJoinFilterInput | null,
};

export type ModelUserClientJoinConnection = {
  __typename: "ModelUserClientJoinConnection",
  items?:  Array<UserClientJoin | null > | null,
  nextToken?: string | null,
};

export type ModelClientFilterInput = {
  id?: ModelIDInput | null,
  join_id?: ModelIDInput | null,
  full_name?: ModelStringInput | null,
  friendly_name?: ModelStringInput | null,
  clientdb_instance?: ModelStringInput | null,
  address?: ModelStringInput | null,
  county?: ModelStringInput | null,
  country?: ModelStringInput | null,
  logo?: ModelStringInput | null,
  join_date?: ModelStringInput | null,
  archived?: ModelBooleanInput | null,
  archive_date?: ModelStringInput | null,
  primary_contact?: ModelStringInput | null,
  contact_email?: ModelStringInput | null,
  contact_phone?: ModelStringInput | null,
  account_manager?: ModelStringInput | null,
  and?: Array< ModelClientFilterInput | null > | null,
  or?: Array< ModelClientFilterInput | null > | null,
  not?: ModelClientFilterInput | null,
};

export type ModelClientConnection = {
  __typename: "ModelClientConnection",
  items?:  Array<Client | null > | null,
  nextToken?: string | null,
};

export type ModelSettingFilterInput = {
  id?: ModelIDInput | null,
  setting?: ModelStringInput | null,
  value?: ModelStringInput | null,
  and?: Array< ModelSettingFilterInput | null > | null,
  or?: Array< ModelSettingFilterInput | null > | null,
  not?: ModelSettingFilterInput | null,
};

export type ModelSettingConnection = {
  __typename: "ModelSettingConnection",
  items?:  Array<Setting | null > | null,
  nextToken?: string | null,
};

export type CreateEventMutationVariables = {
  input?: CreateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type CreateEventMutation = {
  createEvent?:  {
    __typename: "Event",
    id: string,
    client_id: string,
    event_name: string,
    event_logo?: string | null,
    event_desc?: string | null,
    start_date?: string | null,
    end_date?: string | null,
    timezone_abbr?: string | null,
    primary_domain?: string | null,
    other_domains?: Array< string | null > | null,
    address?: string | null,
    city?: string | null,
    county?: string | null,
    country?: string | null,
    archived?: boolean | null,
    archive_date?: string | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      items?:  Array< {
        __typename: "Session",
        id: string,
        event_id: string,
        session_name: string,
        session_desc?: string | null,
        start_date?: string | null,
        end_date?: string | null,
        presenters?:  {
          __typename: "ModelPresenterConnection",
          items?:  Array< {
            __typename: "Presenter",
            id: string,
            session_id: string,
            title?: string | null,
            first_name: string,
            last_name: string,
            email?: string | null,
            company?: string | null,
            profile_img?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        hall?:  {
          __typename: "Hall",
          id: string,
          hall_name: string,
          hall_desc?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        stages?:  {
          __typename: "ModelStageConnection",
          items?:  Array< {
            __typename: "Stage",
            id: string,
            session_id: string,
            stage_name: string,
            stage_desc?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        webinars?:  {
          __typename: "ModelWebinarConnection",
          items?:  Array< {
            __typename: "Webinar",
            id: string,
            session_id: string,
            webinar_name: string,
            webinar_desc?: string | null,
            webinar_type?: string | null,
            webinar_api_key?: string | null,
            webinar_url?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    tables?:  {
      __typename: "ModelTableConnection",
      items?:  Array< {
        __typename: "Table",
        id: string,
        event_id: string,
        table_name: string,
        capacity?: number | null,
        table_logo?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateEventMutationVariables = {
  input?: UpdateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type UpdateEventMutation = {
  updateEvent?:  {
    __typename: "Event",
    id: string,
    client_id: string,
    event_name: string,
    event_logo?: string | null,
    event_desc?: string | null,
    start_date?: string | null,
    end_date?: string | null,
    timezone_abbr?: string | null,
    primary_domain?: string | null,
    other_domains?: Array< string | null > | null,
    address?: string | null,
    city?: string | null,
    county?: string | null,
    country?: string | null,
    archived?: boolean | null,
    archive_date?: string | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      items?:  Array< {
        __typename: "Session",
        id: string,
        event_id: string,
        session_name: string,
        session_desc?: string | null,
        start_date?: string | null,
        end_date?: string | null,
        presenters?:  {
          __typename: "ModelPresenterConnection",
          items?:  Array< {
            __typename: "Presenter",
            id: string,
            session_id: string,
            title?: string | null,
            first_name: string,
            last_name: string,
            email?: string | null,
            company?: string | null,
            profile_img?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        hall?:  {
          __typename: "Hall",
          id: string,
          hall_name: string,
          hall_desc?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        stages?:  {
          __typename: "ModelStageConnection",
          items?:  Array< {
            __typename: "Stage",
            id: string,
            session_id: string,
            stage_name: string,
            stage_desc?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        webinars?:  {
          __typename: "ModelWebinarConnection",
          items?:  Array< {
            __typename: "Webinar",
            id: string,
            session_id: string,
            webinar_name: string,
            webinar_desc?: string | null,
            webinar_type?: string | null,
            webinar_api_key?: string | null,
            webinar_url?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    tables?:  {
      __typename: "ModelTableConnection",
      items?:  Array< {
        __typename: "Table",
        id: string,
        event_id: string,
        table_name: string,
        capacity?: number | null,
        table_logo?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteEventMutationVariables = {
  input?: DeleteEventInput,
  condition?: ModelEventConditionInput | null,
};

export type DeleteEventMutation = {
  deleteEvent?:  {
    __typename: "Event",
    id: string,
    client_id: string,
    event_name: string,
    event_logo?: string | null,
    event_desc?: string | null,
    start_date?: string | null,
    end_date?: string | null,
    timezone_abbr?: string | null,
    primary_domain?: string | null,
    other_domains?: Array< string | null > | null,
    address?: string | null,
    city?: string | null,
    county?: string | null,
    country?: string | null,
    archived?: boolean | null,
    archive_date?: string | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      items?:  Array< {
        __typename: "Session",
        id: string,
        event_id: string,
        session_name: string,
        session_desc?: string | null,
        start_date?: string | null,
        end_date?: string | null,
        presenters?:  {
          __typename: "ModelPresenterConnection",
          items?:  Array< {
            __typename: "Presenter",
            id: string,
            session_id: string,
            title?: string | null,
            first_name: string,
            last_name: string,
            email?: string | null,
            company?: string | null,
            profile_img?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        hall?:  {
          __typename: "Hall",
          id: string,
          hall_name: string,
          hall_desc?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        stages?:  {
          __typename: "ModelStageConnection",
          items?:  Array< {
            __typename: "Stage",
            id: string,
            session_id: string,
            stage_name: string,
            stage_desc?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        webinars?:  {
          __typename: "ModelWebinarConnection",
          items?:  Array< {
            __typename: "Webinar",
            id: string,
            session_id: string,
            webinar_name: string,
            webinar_desc?: string | null,
            webinar_type?: string | null,
            webinar_api_key?: string | null,
            webinar_url?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    tables?:  {
      __typename: "ModelTableConnection",
      items?:  Array< {
        __typename: "Table",
        id: string,
        event_id: string,
        table_name: string,
        capacity?: number | null,
        table_logo?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSessionMutationVariables = {
  input?: CreateSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type CreateSessionMutation = {
  createSession?:  {
    __typename: "Session",
    id: string,
    event_id: string,
    session_name: string,
    session_desc?: string | null,
    start_date?: string | null,
    end_date?: string | null,
    presenters?:  {
      __typename: "ModelPresenterConnection",
      items?:  Array< {
        __typename: "Presenter",
        id: string,
        session_id: string,
        title?: string | null,
        first_name: string,
        last_name: string,
        email?: string | null,
        company?: string | null,
        profile_img?: string | null,
        social_medias?:  {
          __typename: "ModelPresenterSocialMediaConnection",
          items?:  Array< {
            __typename: "PresenterSocialMedia",
            id: string,
            presenter_id: string,
            site: string,
            link?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    hall?:  {
      __typename: "Hall",
      id: string,
      hall_name: string,
      hall_desc?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    stages?:  {
      __typename: "ModelStageConnection",
      items?:  Array< {
        __typename: "Stage",
        id: string,
        session_id: string,
        stage_name: string,
        stage_desc?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    webinars?:  {
      __typename: "ModelWebinarConnection",
      items?:  Array< {
        __typename: "Webinar",
        id: string,
        session_id: string,
        webinar_name: string,
        webinar_desc?: string | null,
        webinar_type?: string | null,
        webinar_api_key?: string | null,
        webinar_url?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSessionMutationVariables = {
  input?: UpdateSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type UpdateSessionMutation = {
  updateSession?:  {
    __typename: "Session",
    id: string,
    event_id: string,
    session_name: string,
    session_desc?: string | null,
    start_date?: string | null,
    end_date?: string | null,
    presenters?:  {
      __typename: "ModelPresenterConnection",
      items?:  Array< {
        __typename: "Presenter",
        id: string,
        session_id: string,
        title?: string | null,
        first_name: string,
        last_name: string,
        email?: string | null,
        company?: string | null,
        profile_img?: string | null,
        social_medias?:  {
          __typename: "ModelPresenterSocialMediaConnection",
          items?:  Array< {
            __typename: "PresenterSocialMedia",
            id: string,
            presenter_id: string,
            site: string,
            link?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    hall?:  {
      __typename: "Hall",
      id: string,
      hall_name: string,
      hall_desc?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    stages?:  {
      __typename: "ModelStageConnection",
      items?:  Array< {
        __typename: "Stage",
        id: string,
        session_id: string,
        stage_name: string,
        stage_desc?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    webinars?:  {
      __typename: "ModelWebinarConnection",
      items?:  Array< {
        __typename: "Webinar",
        id: string,
        session_id: string,
        webinar_name: string,
        webinar_desc?: string | null,
        webinar_type?: string | null,
        webinar_api_key?: string | null,
        webinar_url?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSessionMutationVariables = {
  input?: DeleteSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type DeleteSessionMutation = {
  deleteSession?:  {
    __typename: "Session",
    id: string,
    event_id: string,
    session_name: string,
    session_desc?: string | null,
    start_date?: string | null,
    end_date?: string | null,
    presenters?:  {
      __typename: "ModelPresenterConnection",
      items?:  Array< {
        __typename: "Presenter",
        id: string,
        session_id: string,
        title?: string | null,
        first_name: string,
        last_name: string,
        email?: string | null,
        company?: string | null,
        profile_img?: string | null,
        social_medias?:  {
          __typename: "ModelPresenterSocialMediaConnection",
          items?:  Array< {
            __typename: "PresenterSocialMedia",
            id: string,
            presenter_id: string,
            site: string,
            link?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    hall?:  {
      __typename: "Hall",
      id: string,
      hall_name: string,
      hall_desc?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    stages?:  {
      __typename: "ModelStageConnection",
      items?:  Array< {
        __typename: "Stage",
        id: string,
        session_id: string,
        stage_name: string,
        stage_desc?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    webinars?:  {
      __typename: "ModelWebinarConnection",
      items?:  Array< {
        __typename: "Webinar",
        id: string,
        session_id: string,
        webinar_name: string,
        webinar_desc?: string | null,
        webinar_type?: string | null,
        webinar_api_key?: string | null,
        webinar_url?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePresenterMutationVariables = {
  input?: CreatePresenterInput,
  condition?: ModelPresenterConditionInput | null,
};

export type CreatePresenterMutation = {
  createPresenter?:  {
    __typename: "Presenter",
    id: string,
    session_id: string,
    title?: string | null,
    first_name: string,
    last_name: string,
    email?: string | null,
    company?: string | null,
    profile_img?: string | null,
    social_medias?:  {
      __typename: "ModelPresenterSocialMediaConnection",
      items?:  Array< {
        __typename: "PresenterSocialMedia",
        id: string,
        presenter_id: string,
        site: string,
        link?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePresenterMutationVariables = {
  input?: UpdatePresenterInput,
  condition?: ModelPresenterConditionInput | null,
};

export type UpdatePresenterMutation = {
  updatePresenter?:  {
    __typename: "Presenter",
    id: string,
    session_id: string,
    title?: string | null,
    first_name: string,
    last_name: string,
    email?: string | null,
    company?: string | null,
    profile_img?: string | null,
    social_medias?:  {
      __typename: "ModelPresenterSocialMediaConnection",
      items?:  Array< {
        __typename: "PresenterSocialMedia",
        id: string,
        presenter_id: string,
        site: string,
        link?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePresenterMutationVariables = {
  input?: DeletePresenterInput,
  condition?: ModelPresenterConditionInput | null,
};

export type DeletePresenterMutation = {
  deletePresenter?:  {
    __typename: "Presenter",
    id: string,
    session_id: string,
    title?: string | null,
    first_name: string,
    last_name: string,
    email?: string | null,
    company?: string | null,
    profile_img?: string | null,
    social_medias?:  {
      __typename: "ModelPresenterSocialMediaConnection",
      items?:  Array< {
        __typename: "PresenterSocialMedia",
        id: string,
        presenter_id: string,
        site: string,
        link?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTableMutationVariables = {
  input?: CreateTableInput,
  condition?: ModelTableConditionInput | null,
};

export type CreateTableMutation = {
  createTable?:  {
    __typename: "Table",
    id: string,
    event_id: string,
    table_name: string,
    capacity?: number | null,
    table_logo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTableMutationVariables = {
  input?: UpdateTableInput,
  condition?: ModelTableConditionInput | null,
};

export type UpdateTableMutation = {
  updateTable?:  {
    __typename: "Table",
    id: string,
    event_id: string,
    table_name: string,
    capacity?: number | null,
    table_logo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTableMutationVariables = {
  input?: DeleteTableInput,
  condition?: ModelTableConditionInput | null,
};

export type DeleteTableMutation = {
  deleteTable?:  {
    __typename: "Table",
    id: string,
    event_id: string,
    table_name: string,
    capacity?: number | null,
    table_logo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateHallMutationVariables = {
  input?: CreateHallInput,
  condition?: ModelHallConditionInput | null,
};

export type CreateHallMutation = {
  createHall?:  {
    __typename: "Hall",
    id: string,
    hall_name: string,
    hall_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateHallMutationVariables = {
  input?: UpdateHallInput,
  condition?: ModelHallConditionInput | null,
};

export type UpdateHallMutation = {
  updateHall?:  {
    __typename: "Hall",
    id: string,
    hall_name: string,
    hall_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteHallMutationVariables = {
  input?: DeleteHallInput,
  condition?: ModelHallConditionInput | null,
};

export type DeleteHallMutation = {
  deleteHall?:  {
    __typename: "Hall",
    id: string,
    hall_name: string,
    hall_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateStageMutationVariables = {
  input?: CreateStageInput,
  condition?: ModelStageConditionInput | null,
};

export type CreateStageMutation = {
  createStage?:  {
    __typename: "Stage",
    id: string,
    session_id: string,
    stage_name: string,
    stage_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateStageMutationVariables = {
  input?: UpdateStageInput,
  condition?: ModelStageConditionInput | null,
};

export type UpdateStageMutation = {
  updateStage?:  {
    __typename: "Stage",
    id: string,
    session_id: string,
    stage_name: string,
    stage_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteStageMutationVariables = {
  input?: DeleteStageInput,
  condition?: ModelStageConditionInput | null,
};

export type DeleteStageMutation = {
  deleteStage?:  {
    __typename: "Stage",
    id: string,
    session_id: string,
    stage_name: string,
    stage_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateWebinarMutationVariables = {
  input?: CreateWebinarInput,
  condition?: ModelWebinarConditionInput | null,
};

export type CreateWebinarMutation = {
  createWebinar?:  {
    __typename: "Webinar",
    id: string,
    session_id: string,
    webinar_name: string,
    webinar_desc?: string | null,
    webinar_type?: string | null,
    webinar_api_key?: string | null,
    webinar_url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateWebinarMutationVariables = {
  input?: UpdateWebinarInput,
  condition?: ModelWebinarConditionInput | null,
};

export type UpdateWebinarMutation = {
  updateWebinar?:  {
    __typename: "Webinar",
    id: string,
    session_id: string,
    webinar_name: string,
    webinar_desc?: string | null,
    webinar_type?: string | null,
    webinar_api_key?: string | null,
    webinar_url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteWebinarMutationVariables = {
  input?: DeleteWebinarInput,
  condition?: ModelWebinarConditionInput | null,
};

export type DeleteWebinarMutation = {
  deleteWebinar?:  {
    __typename: "Webinar",
    id: string,
    session_id: string,
    webinar_name: string,
    webinar_desc?: string | null,
    webinar_type?: string | null,
    webinar_api_key?: string | null,
    webinar_url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePresenterSocialMediaMutationVariables = {
  input?: CreatePresenterSocialMediaInput,
  condition?: ModelPresenterSocialMediaConditionInput | null,
};

export type CreatePresenterSocialMediaMutation = {
  createPresenterSocialMedia?:  {
    __typename: "PresenterSocialMedia",
    id: string,
    presenter_id: string,
    site: string,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePresenterSocialMediaMutationVariables = {
  input?: UpdatePresenterSocialMediaInput,
  condition?: ModelPresenterSocialMediaConditionInput | null,
};

export type UpdatePresenterSocialMediaMutation = {
  updatePresenterSocialMedia?:  {
    __typename: "PresenterSocialMedia",
    id: string,
    presenter_id: string,
    site: string,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePresenterSocialMediaMutationVariables = {
  input?: DeletePresenterSocialMediaInput,
  condition?: ModelPresenterSocialMediaConditionInput | null,
};

export type DeletePresenterSocialMediaMutation = {
  deletePresenterSocialMedia?:  {
    __typename: "PresenterSocialMedia",
    id: string,
    presenter_id: string,
    site: string,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input?: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    cognito_sub: string,
    title?: string | null,
    first_name?: string | null,
    last_name?: string | null,
    job_title?: string | null,
    profile_img?: string | null,
    ignore?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input?: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    cognito_sub: string,
    title?: string | null,
    first_name?: string | null,
    last_name?: string | null,
    job_title?: string | null,
    profile_img?: string | null,
    ignore?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input?: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    cognito_sub: string,
    title?: string | null,
    first_name?: string | null,
    last_name?: string | null,
    job_title?: string | null,
    profile_img?: string | null,
    ignore?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserEventGroupMutationVariables = {
  input?: CreateUserEventGroupInput,
  condition?: ModelUserEventGroupConditionInput | null,
};

export type CreateUserEventGroupMutation = {
  createUserEventGroup?:  {
    __typename: "UserEventGroup",
    id: string,
    join_id: string,
    name: string,
    active?: boolean | null,
    user?:  {
      __typename: "UserEventJoin",
      id: string,
      cognito_sub: string,
      client_id: string,
      event?:  {
        __typename: "Event",
        id: string,
        client_id: string,
        event_name: string,
        event_logo?: string | null,
        event_desc?: string | null,
        start_date?: string | null,
        end_date?: string | null,
        timezone_abbr?: string | null,
        primary_domain?: string | null,
        other_domains?: Array< string | null > | null,
        address?: string | null,
        city?: string | null,
        county?: string | null,
        country?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        sessions?:  {
          __typename: "ModelSessionConnection",
          items?:  Array< {
            __typename: "Session",
            id: string,
            event_id: string,
            session_name: string,
            session_desc?: string | null,
            start_date?: string | null,
            end_date?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        tables?:  {
          __typename: "ModelTableConnection",
          items?:  Array< {
            __typename: "Table",
            id: string,
            event_id: string,
            table_name: string,
            capacity?: number | null,
            table_logo?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      groups?:  {
        __typename: "ModelUserEventGroupConnection",
        items?:  Array< {
          __typename: "UserEventGroup",
          id: string,
          join_id: string,
          name: string,
          active?: boolean | null,
          user?:  {
            __typename: "UserEventJoin",
            id: string,
            cognito_sub: string,
            client_id: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserEventGroupMutationVariables = {
  input?: UpdateUserEventGroupInput,
  condition?: ModelUserEventGroupConditionInput | null,
};

export type UpdateUserEventGroupMutation = {
  updateUserEventGroup?:  {
    __typename: "UserEventGroup",
    id: string,
    join_id: string,
    name: string,
    active?: boolean | null,
    user?:  {
      __typename: "UserEventJoin",
      id: string,
      cognito_sub: string,
      client_id: string,
      event?:  {
        __typename: "Event",
        id: string,
        client_id: string,
        event_name: string,
        event_logo?: string | null,
        event_desc?: string | null,
        start_date?: string | null,
        end_date?: string | null,
        timezone_abbr?: string | null,
        primary_domain?: string | null,
        other_domains?: Array< string | null > | null,
        address?: string | null,
        city?: string | null,
        county?: string | null,
        country?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        sessions?:  {
          __typename: "ModelSessionConnection",
          items?:  Array< {
            __typename: "Session",
            id: string,
            event_id: string,
            session_name: string,
            session_desc?: string | null,
            start_date?: string | null,
            end_date?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        tables?:  {
          __typename: "ModelTableConnection",
          items?:  Array< {
            __typename: "Table",
            id: string,
            event_id: string,
            table_name: string,
            capacity?: number | null,
            table_logo?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      groups?:  {
        __typename: "ModelUserEventGroupConnection",
        items?:  Array< {
          __typename: "UserEventGroup",
          id: string,
          join_id: string,
          name: string,
          active?: boolean | null,
          user?:  {
            __typename: "UserEventJoin",
            id: string,
            cognito_sub: string,
            client_id: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserEventGroupMutationVariables = {
  input?: DeleteUserEventGroupInput,
  condition?: ModelUserEventGroupConditionInput | null,
};

export type DeleteUserEventGroupMutation = {
  deleteUserEventGroup?:  {
    __typename: "UserEventGroup",
    id: string,
    join_id: string,
    name: string,
    active?: boolean | null,
    user?:  {
      __typename: "UserEventJoin",
      id: string,
      cognito_sub: string,
      client_id: string,
      event?:  {
        __typename: "Event",
        id: string,
        client_id: string,
        event_name: string,
        event_logo?: string | null,
        event_desc?: string | null,
        start_date?: string | null,
        end_date?: string | null,
        timezone_abbr?: string | null,
        primary_domain?: string | null,
        other_domains?: Array< string | null > | null,
        address?: string | null,
        city?: string | null,
        county?: string | null,
        country?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        sessions?:  {
          __typename: "ModelSessionConnection",
          items?:  Array< {
            __typename: "Session",
            id: string,
            event_id: string,
            session_name: string,
            session_desc?: string | null,
            start_date?: string | null,
            end_date?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        tables?:  {
          __typename: "ModelTableConnection",
          items?:  Array< {
            __typename: "Table",
            id: string,
            event_id: string,
            table_name: string,
            capacity?: number | null,
            table_logo?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      groups?:  {
        __typename: "ModelUserEventGroupConnection",
        items?:  Array< {
          __typename: "UserEventGroup",
          id: string,
          join_id: string,
          name: string,
          active?: boolean | null,
          user?:  {
            __typename: "UserEventJoin",
            id: string,
            cognito_sub: string,
            client_id: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserEventJoinMutationVariables = {
  input?: CreateUserEventJoinInput,
  condition?: ModelUserEventJoinConditionInput | null,
};

export type CreateUserEventJoinMutation = {
  createUserEventJoin?:  {
    __typename: "UserEventJoin",
    id: string,
    cognito_sub: string,
    client_id: string,
    event?:  {
      __typename: "Event",
      id: string,
      client_id: string,
      event_name: string,
      event_logo?: string | null,
      event_desc?: string | null,
      start_date?: string | null,
      end_date?: string | null,
      timezone_abbr?: string | null,
      primary_domain?: string | null,
      other_domains?: Array< string | null > | null,
      address?: string | null,
      city?: string | null,
      county?: string | null,
      country?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      sessions?:  {
        __typename: "ModelSessionConnection",
        items?:  Array< {
          __typename: "Session",
          id: string,
          event_id: string,
          session_name: string,
          session_desc?: string | null,
          start_date?: string | null,
          end_date?: string | null,
          presenters?:  {
            __typename: "ModelPresenterConnection",
            nextToken?: string | null,
          } | null,
          hall?:  {
            __typename: "Hall",
            id: string,
            hall_name: string,
            hall_desc?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          stages?:  {
            __typename: "ModelStageConnection",
            nextToken?: string | null,
          } | null,
          webinars?:  {
            __typename: "ModelWebinarConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      tables?:  {
        __typename: "ModelTableConnection",
        items?:  Array< {
          __typename: "Table",
          id: string,
          event_id: string,
          table_name: string,
          capacity?: number | null,
          table_logo?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    groups?:  {
      __typename: "ModelUserEventGroupConnection",
      items?:  Array< {
        __typename: "UserEventGroup",
        id: string,
        join_id: string,
        name: string,
        active?: boolean | null,
        user?:  {
          __typename: "UserEventJoin",
          id: string,
          cognito_sub: string,
          client_id: string,
          event?:  {
            __typename: "Event",
            id: string,
            client_id: string,
            event_name: string,
            event_logo?: string | null,
            event_desc?: string | null,
            start_date?: string | null,
            end_date?: string | null,
            timezone_abbr?: string | null,
            primary_domain?: string | null,
            other_domains?: Array< string | null > | null,
            address?: string | null,
            city?: string | null,
            county?: string | null,
            country?: string | null,
            archived?: boolean | null,
            archive_date?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          groups?:  {
            __typename: "ModelUserEventGroupConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserEventJoinMutationVariables = {
  input?: UpdateUserEventJoinInput,
  condition?: ModelUserEventJoinConditionInput | null,
};

export type UpdateUserEventJoinMutation = {
  updateUserEventJoin?:  {
    __typename: "UserEventJoin",
    id: string,
    cognito_sub: string,
    client_id: string,
    event?:  {
      __typename: "Event",
      id: string,
      client_id: string,
      event_name: string,
      event_logo?: string | null,
      event_desc?: string | null,
      start_date?: string | null,
      end_date?: string | null,
      timezone_abbr?: string | null,
      primary_domain?: string | null,
      other_domains?: Array< string | null > | null,
      address?: string | null,
      city?: string | null,
      county?: string | null,
      country?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      sessions?:  {
        __typename: "ModelSessionConnection",
        items?:  Array< {
          __typename: "Session",
          id: string,
          event_id: string,
          session_name: string,
          session_desc?: string | null,
          start_date?: string | null,
          end_date?: string | null,
          presenters?:  {
            __typename: "ModelPresenterConnection",
            nextToken?: string | null,
          } | null,
          hall?:  {
            __typename: "Hall",
            id: string,
            hall_name: string,
            hall_desc?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          stages?:  {
            __typename: "ModelStageConnection",
            nextToken?: string | null,
          } | null,
          webinars?:  {
            __typename: "ModelWebinarConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      tables?:  {
        __typename: "ModelTableConnection",
        items?:  Array< {
          __typename: "Table",
          id: string,
          event_id: string,
          table_name: string,
          capacity?: number | null,
          table_logo?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    groups?:  {
      __typename: "ModelUserEventGroupConnection",
      items?:  Array< {
        __typename: "UserEventGroup",
        id: string,
        join_id: string,
        name: string,
        active?: boolean | null,
        user?:  {
          __typename: "UserEventJoin",
          id: string,
          cognito_sub: string,
          client_id: string,
          event?:  {
            __typename: "Event",
            id: string,
            client_id: string,
            event_name: string,
            event_logo?: string | null,
            event_desc?: string | null,
            start_date?: string | null,
            end_date?: string | null,
            timezone_abbr?: string | null,
            primary_domain?: string | null,
            other_domains?: Array< string | null > | null,
            address?: string | null,
            city?: string | null,
            county?: string | null,
            country?: string | null,
            archived?: boolean | null,
            archive_date?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          groups?:  {
            __typename: "ModelUserEventGroupConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserEventJoinMutationVariables = {
  input?: DeleteUserEventJoinInput,
  condition?: ModelUserEventJoinConditionInput | null,
};

export type DeleteUserEventJoinMutation = {
  deleteUserEventJoin?:  {
    __typename: "UserEventJoin",
    id: string,
    cognito_sub: string,
    client_id: string,
    event?:  {
      __typename: "Event",
      id: string,
      client_id: string,
      event_name: string,
      event_logo?: string | null,
      event_desc?: string | null,
      start_date?: string | null,
      end_date?: string | null,
      timezone_abbr?: string | null,
      primary_domain?: string | null,
      other_domains?: Array< string | null > | null,
      address?: string | null,
      city?: string | null,
      county?: string | null,
      country?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      sessions?:  {
        __typename: "ModelSessionConnection",
        items?:  Array< {
          __typename: "Session",
          id: string,
          event_id: string,
          session_name: string,
          session_desc?: string | null,
          start_date?: string | null,
          end_date?: string | null,
          presenters?:  {
            __typename: "ModelPresenterConnection",
            nextToken?: string | null,
          } | null,
          hall?:  {
            __typename: "Hall",
            id: string,
            hall_name: string,
            hall_desc?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          stages?:  {
            __typename: "ModelStageConnection",
            nextToken?: string | null,
          } | null,
          webinars?:  {
            __typename: "ModelWebinarConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      tables?:  {
        __typename: "ModelTableConnection",
        items?:  Array< {
          __typename: "Table",
          id: string,
          event_id: string,
          table_name: string,
          capacity?: number | null,
          table_logo?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    groups?:  {
      __typename: "ModelUserEventGroupConnection",
      items?:  Array< {
        __typename: "UserEventGroup",
        id: string,
        join_id: string,
        name: string,
        active?: boolean | null,
        user?:  {
          __typename: "UserEventJoin",
          id: string,
          cognito_sub: string,
          client_id: string,
          event?:  {
            __typename: "Event",
            id: string,
            client_id: string,
            event_name: string,
            event_logo?: string | null,
            event_desc?: string | null,
            start_date?: string | null,
            end_date?: string | null,
            timezone_abbr?: string | null,
            primary_domain?: string | null,
            other_domains?: Array< string | null > | null,
            address?: string | null,
            city?: string | null,
            county?: string | null,
            country?: string | null,
            archived?: boolean | null,
            archive_date?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          groups?:  {
            __typename: "ModelUserEventGroupConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTrueChatRoomMutationVariables = {
  input?: CreateTrueChatRoomInput,
  condition?: ModelTrueChatRoomConditionInput | null,
};

export type CreateTrueChatRoomMutation = {
  createTrueChatRoom?:  {
    __typename: "TrueChatRoom",
    id: string,
    room_name: string,
    messages?:  {
      __typename: "ModelTrueChatMessageConnection",
      items?:  Array< {
        __typename: "TrueChatMessage",
        id: string,
        cognito_sub: string,
        room_id: string,
        message: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTrueChatRoomMutationVariables = {
  input?: UpdateTrueChatRoomInput,
  condition?: ModelTrueChatRoomConditionInput | null,
};

export type UpdateTrueChatRoomMutation = {
  updateTrueChatRoom?:  {
    __typename: "TrueChatRoom",
    id: string,
    room_name: string,
    messages?:  {
      __typename: "ModelTrueChatMessageConnection",
      items?:  Array< {
        __typename: "TrueChatMessage",
        id: string,
        cognito_sub: string,
        room_id: string,
        message: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTrueChatRoomMutationVariables = {
  input?: DeleteTrueChatRoomInput,
  condition?: ModelTrueChatRoomConditionInput | null,
};

export type DeleteTrueChatRoomMutation = {
  deleteTrueChatRoom?:  {
    __typename: "TrueChatRoom",
    id: string,
    room_name: string,
    messages?:  {
      __typename: "ModelTrueChatMessageConnection",
      items?:  Array< {
        __typename: "TrueChatMessage",
        id: string,
        cognito_sub: string,
        room_id: string,
        message: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTrueChatMessageMutationVariables = {
  input?: CreateTrueChatMessageInput,
  condition?: ModelTrueChatMessageConditionInput | null,
};

export type CreateTrueChatMessageMutation = {
  createTrueChatMessage?:  {
    __typename: "TrueChatMessage",
    id: string,
    cognito_sub: string,
    room_id: string,
    message: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTrueChatMessageMutationVariables = {
  input?: UpdateTrueChatMessageInput,
  condition?: ModelTrueChatMessageConditionInput | null,
};

export type UpdateTrueChatMessageMutation = {
  updateTrueChatMessage?:  {
    __typename: "TrueChatMessage",
    id: string,
    cognito_sub: string,
    room_id: string,
    message: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTrueChatMessageMutationVariables = {
  input?: DeleteTrueChatMessageInput,
  condition?: ModelTrueChatMessageConditionInput | null,
};

export type DeleteTrueChatMessageMutation = {
  deleteTrueChatMessage?:  {
    __typename: "TrueChatMessage",
    id: string,
    cognito_sub: string,
    room_id: string,
    message: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateFavouriteMutationVariables = {
  input?: CreateFavouriteInput,
  condition?: ModelFavouriteConditionInput | null,
};

export type CreateFavouriteMutation = {
  createFavourite?:  {
    __typename: "Favourite",
    id: string,
    cognito_sub: string,
    client_id: string,
    event_id: string,
    session_id?: string | null,
    presenter_id?: string | null,
    attendee_cognito_sub?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFavouriteMutationVariables = {
  input?: UpdateFavouriteInput,
  condition?: ModelFavouriteConditionInput | null,
};

export type UpdateFavouriteMutation = {
  updateFavourite?:  {
    __typename: "Favourite",
    id: string,
    cognito_sub: string,
    client_id: string,
    event_id: string,
    session_id?: string | null,
    presenter_id?: string | null,
    attendee_cognito_sub?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFavouriteMutationVariables = {
  input?: DeleteFavouriteInput,
  condition?: ModelFavouriteConditionInput | null,
};

export type DeleteFavouriteMutation = {
  deleteFavourite?:  {
    __typename: "Favourite",
    id: string,
    cognito_sub: string,
    client_id: string,
    event_id: string,
    session_id?: string | null,
    presenter_id?: string | null,
    attendee_cognito_sub?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserClientJoinMutationVariables = {
  input?: CreateUserClientJoinInput,
  condition?: ModelUserClientJoinConditionInput | null,
};

export type CreateUserClientJoinMutation = {
  createUserClientJoin?:  {
    __typename: "UserClientJoin",
    id: string,
    cognito_sub: string,
    client?:  {
      __typename: "Client",
      id: string,
      join_id: string,
      full_name: string,
      friendly_name: string,
      clientdb_instance?: string | null,
      address?: string | null,
      county?: string | null,
      country?: string | null,
      logo?: string | null,
      join_date?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      primary_contact?: string | null,
      contact_email?: string | null,
      contact_phone?: string | null,
      account_manager?: string | null,
      user?:  {
        __typename: "UserClientJoin",
        id: string,
        cognito_sub: string,
        client?:  {
          __typename: "Client",
          id: string,
          join_id: string,
          full_name: string,
          friendly_name: string,
          clientdb_instance?: string | null,
          address?: string | null,
          county?: string | null,
          country?: string | null,
          logo?: string | null,
          join_date?: string | null,
          archived?: boolean | null,
          archive_date?: string | null,
          primary_contact?: string | null,
          contact_email?: string | null,
          contact_phone?: string | null,
          account_manager?: string | null,
          user?:  {
            __typename: "UserClientJoin",
            id: string,
            cognito_sub: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserClientJoinMutationVariables = {
  input?: UpdateUserClientJoinInput,
  condition?: ModelUserClientJoinConditionInput | null,
};

export type UpdateUserClientJoinMutation = {
  updateUserClientJoin?:  {
    __typename: "UserClientJoin",
    id: string,
    cognito_sub: string,
    client?:  {
      __typename: "Client",
      id: string,
      join_id: string,
      full_name: string,
      friendly_name: string,
      clientdb_instance?: string | null,
      address?: string | null,
      county?: string | null,
      country?: string | null,
      logo?: string | null,
      join_date?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      primary_contact?: string | null,
      contact_email?: string | null,
      contact_phone?: string | null,
      account_manager?: string | null,
      user?:  {
        __typename: "UserClientJoin",
        id: string,
        cognito_sub: string,
        client?:  {
          __typename: "Client",
          id: string,
          join_id: string,
          full_name: string,
          friendly_name: string,
          clientdb_instance?: string | null,
          address?: string | null,
          county?: string | null,
          country?: string | null,
          logo?: string | null,
          join_date?: string | null,
          archived?: boolean | null,
          archive_date?: string | null,
          primary_contact?: string | null,
          contact_email?: string | null,
          contact_phone?: string | null,
          account_manager?: string | null,
          user?:  {
            __typename: "UserClientJoin",
            id: string,
            cognito_sub: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserClientJoinMutationVariables = {
  input?: DeleteUserClientJoinInput,
  condition?: ModelUserClientJoinConditionInput | null,
};

export type DeleteUserClientJoinMutation = {
  deleteUserClientJoin?:  {
    __typename: "UserClientJoin",
    id: string,
    cognito_sub: string,
    client?:  {
      __typename: "Client",
      id: string,
      join_id: string,
      full_name: string,
      friendly_name: string,
      clientdb_instance?: string | null,
      address?: string | null,
      county?: string | null,
      country?: string | null,
      logo?: string | null,
      join_date?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      primary_contact?: string | null,
      contact_email?: string | null,
      contact_phone?: string | null,
      account_manager?: string | null,
      user?:  {
        __typename: "UserClientJoin",
        id: string,
        cognito_sub: string,
        client?:  {
          __typename: "Client",
          id: string,
          join_id: string,
          full_name: string,
          friendly_name: string,
          clientdb_instance?: string | null,
          address?: string | null,
          county?: string | null,
          country?: string | null,
          logo?: string | null,
          join_date?: string | null,
          archived?: boolean | null,
          archive_date?: string | null,
          primary_contact?: string | null,
          contact_email?: string | null,
          contact_phone?: string | null,
          account_manager?: string | null,
          user?:  {
            __typename: "UserClientJoin",
            id: string,
            cognito_sub: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateClientMutationVariables = {
  input?: CreateClientInput,
  condition?: ModelClientConditionInput | null,
};

export type CreateClientMutation = {
  createClient?:  {
    __typename: "Client",
    id: string,
    join_id: string,
    full_name: string,
    friendly_name: string,
    clientdb_instance?: string | null,
    address?: string | null,
    county?: string | null,
    country?: string | null,
    logo?: string | null,
    join_date?: string | null,
    archived?: boolean | null,
    archive_date?: string | null,
    primary_contact?: string | null,
    contact_email?: string | null,
    contact_phone?: string | null,
    account_manager?: string | null,
    user?:  {
      __typename: "UserClientJoin",
      id: string,
      cognito_sub: string,
      client?:  {
        __typename: "Client",
        id: string,
        join_id: string,
        full_name: string,
        friendly_name: string,
        clientdb_instance?: string | null,
        address?: string | null,
        county?: string | null,
        country?: string | null,
        logo?: string | null,
        join_date?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        primary_contact?: string | null,
        contact_email?: string | null,
        contact_phone?: string | null,
        account_manager?: string | null,
        user?:  {
          __typename: "UserClientJoin",
          id: string,
          cognito_sub: string,
          client?:  {
            __typename: "Client",
            id: string,
            join_id: string,
            full_name: string,
            friendly_name: string,
            clientdb_instance?: string | null,
            address?: string | null,
            county?: string | null,
            country?: string | null,
            logo?: string | null,
            join_date?: string | null,
            archived?: boolean | null,
            archive_date?: string | null,
            primary_contact?: string | null,
            contact_email?: string | null,
            contact_phone?: string | null,
            account_manager?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateClientMutationVariables = {
  input?: UpdateClientInput,
  condition?: ModelClientConditionInput | null,
};

export type UpdateClientMutation = {
  updateClient?:  {
    __typename: "Client",
    id: string,
    join_id: string,
    full_name: string,
    friendly_name: string,
    clientdb_instance?: string | null,
    address?: string | null,
    county?: string | null,
    country?: string | null,
    logo?: string | null,
    join_date?: string | null,
    archived?: boolean | null,
    archive_date?: string | null,
    primary_contact?: string | null,
    contact_email?: string | null,
    contact_phone?: string | null,
    account_manager?: string | null,
    user?:  {
      __typename: "UserClientJoin",
      id: string,
      cognito_sub: string,
      client?:  {
        __typename: "Client",
        id: string,
        join_id: string,
        full_name: string,
        friendly_name: string,
        clientdb_instance?: string | null,
        address?: string | null,
        county?: string | null,
        country?: string | null,
        logo?: string | null,
        join_date?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        primary_contact?: string | null,
        contact_email?: string | null,
        contact_phone?: string | null,
        account_manager?: string | null,
        user?:  {
          __typename: "UserClientJoin",
          id: string,
          cognito_sub: string,
          client?:  {
            __typename: "Client",
            id: string,
            join_id: string,
            full_name: string,
            friendly_name: string,
            clientdb_instance?: string | null,
            address?: string | null,
            county?: string | null,
            country?: string | null,
            logo?: string | null,
            join_date?: string | null,
            archived?: boolean | null,
            archive_date?: string | null,
            primary_contact?: string | null,
            contact_email?: string | null,
            contact_phone?: string | null,
            account_manager?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteClientMutationVariables = {
  input?: DeleteClientInput,
  condition?: ModelClientConditionInput | null,
};

export type DeleteClientMutation = {
  deleteClient?:  {
    __typename: "Client",
    id: string,
    join_id: string,
    full_name: string,
    friendly_name: string,
    clientdb_instance?: string | null,
    address?: string | null,
    county?: string | null,
    country?: string | null,
    logo?: string | null,
    join_date?: string | null,
    archived?: boolean | null,
    archive_date?: string | null,
    primary_contact?: string | null,
    contact_email?: string | null,
    contact_phone?: string | null,
    account_manager?: string | null,
    user?:  {
      __typename: "UserClientJoin",
      id: string,
      cognito_sub: string,
      client?:  {
        __typename: "Client",
        id: string,
        join_id: string,
        full_name: string,
        friendly_name: string,
        clientdb_instance?: string | null,
        address?: string | null,
        county?: string | null,
        country?: string | null,
        logo?: string | null,
        join_date?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        primary_contact?: string | null,
        contact_email?: string | null,
        contact_phone?: string | null,
        account_manager?: string | null,
        user?:  {
          __typename: "UserClientJoin",
          id: string,
          cognito_sub: string,
          client?:  {
            __typename: "Client",
            id: string,
            join_id: string,
            full_name: string,
            friendly_name: string,
            clientdb_instance?: string | null,
            address?: string | null,
            county?: string | null,
            country?: string | null,
            logo?: string | null,
            join_date?: string | null,
            archived?: boolean | null,
            archive_date?: string | null,
            primary_contact?: string | null,
            contact_email?: string | null,
            contact_phone?: string | null,
            account_manager?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSettingMutationVariables = {
  input?: CreateSettingInput,
  condition?: ModelSettingConditionInput | null,
};

export type CreateSettingMutation = {
  createSetting?:  {
    __typename: "Setting",
    id: string,
    setting: string,
    value?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSettingMutationVariables = {
  input?: UpdateSettingInput,
  condition?: ModelSettingConditionInput | null,
};

export type UpdateSettingMutation = {
  updateSetting?:  {
    __typename: "Setting",
    id: string,
    setting: string,
    value?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSettingMutationVariables = {
  input?: DeleteSettingInput,
  condition?: ModelSettingConditionInput | null,
};

export type DeleteSettingMutation = {
  deleteSetting?:  {
    __typename: "Setting",
    id: string,
    setting: string,
    value?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetEventQueryVariables = {
  id?: string,
};

export type GetEventQuery = {
  getEvent?:  {
    __typename: "Event",
    id: string,
    client_id: string,
    event_name: string,
    event_logo?: string | null,
    event_desc?: string | null,
    start_date?: string | null,
    end_date?: string | null,
    timezone_abbr?: string | null,
    primary_domain?: string | null,
    other_domains?: Array< string | null > | null,
    address?: string | null,
    city?: string | null,
    county?: string | null,
    country?: string | null,
    archived?: boolean | null,
    archive_date?: string | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      items?:  Array< {
        __typename: "Session",
        id: string,
        event_id: string,
        session_name: string,
        session_desc?: string | null,
        start_date?: string | null,
        end_date?: string | null,
        presenters?:  {
          __typename: "ModelPresenterConnection",
          items?:  Array< {
            __typename: "Presenter",
            id: string,
            session_id: string,
            title?: string | null,
            first_name: string,
            last_name: string,
            email?: string | null,
            company?: string | null,
            profile_img?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        hall?:  {
          __typename: "Hall",
          id: string,
          hall_name: string,
          hall_desc?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        stages?:  {
          __typename: "ModelStageConnection",
          items?:  Array< {
            __typename: "Stage",
            id: string,
            session_id: string,
            stage_name: string,
            stage_desc?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        webinars?:  {
          __typename: "ModelWebinarConnection",
          items?:  Array< {
            __typename: "Webinar",
            id: string,
            session_id: string,
            webinar_name: string,
            webinar_desc?: string | null,
            webinar_type?: string | null,
            webinar_api_key?: string | null,
            webinar_url?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    tables?:  {
      __typename: "ModelTableConnection",
      items?:  Array< {
        __typename: "Table",
        id: string,
        event_id: string,
        table_name: string,
        capacity?: number | null,
        table_logo?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListEventsQueryVariables = {
  filter?: ModelEventFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEventsQuery = {
  listEvents?:  {
    __typename: "ModelEventConnection",
    items?:  Array< {
      __typename: "Event",
      id: string,
      client_id: string,
      event_name: string,
      event_logo?: string | null,
      event_desc?: string | null,
      start_date?: string | null,
      end_date?: string | null,
      timezone_abbr?: string | null,
      primary_domain?: string | null,
      other_domains?: Array< string | null > | null,
      address?: string | null,
      city?: string | null,
      county?: string | null,
      country?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      sessions?:  {
        __typename: "ModelSessionConnection",
        items?:  Array< {
          __typename: "Session",
          id: string,
          event_id: string,
          session_name: string,
          session_desc?: string | null,
          start_date?: string | null,
          end_date?: string | null,
          presenters?:  {
            __typename: "ModelPresenterConnection",
            nextToken?: string | null,
          } | null,
          hall?:  {
            __typename: "Hall",
            id: string,
            hall_name: string,
            hall_desc?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          stages?:  {
            __typename: "ModelStageConnection",
            nextToken?: string | null,
          } | null,
          webinars?:  {
            __typename: "ModelWebinarConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      tables?:  {
        __typename: "ModelTableConnection",
        items?:  Array< {
          __typename: "Table",
          id: string,
          event_id: string,
          table_name: string,
          capacity?: number | null,
          table_logo?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetSessionQueryVariables = {
  id?: string,
};

export type GetSessionQuery = {
  getSession?:  {
    __typename: "Session",
    id: string,
    event_id: string,
    session_name: string,
    session_desc?: string | null,
    start_date?: string | null,
    end_date?: string | null,
    presenters?:  {
      __typename: "ModelPresenterConnection",
      items?:  Array< {
        __typename: "Presenter",
        id: string,
        session_id: string,
        title?: string | null,
        first_name: string,
        last_name: string,
        email?: string | null,
        company?: string | null,
        profile_img?: string | null,
        social_medias?:  {
          __typename: "ModelPresenterSocialMediaConnection",
          items?:  Array< {
            __typename: "PresenterSocialMedia",
            id: string,
            presenter_id: string,
            site: string,
            link?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    hall?:  {
      __typename: "Hall",
      id: string,
      hall_name: string,
      hall_desc?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    stages?:  {
      __typename: "ModelStageConnection",
      items?:  Array< {
        __typename: "Stage",
        id: string,
        session_id: string,
        stage_name: string,
        stage_desc?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    webinars?:  {
      __typename: "ModelWebinarConnection",
      items?:  Array< {
        __typename: "Webinar",
        id: string,
        session_id: string,
        webinar_name: string,
        webinar_desc?: string | null,
        webinar_type?: string | null,
        webinar_api_key?: string | null,
        webinar_url?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSessionsQueryVariables = {
  filter?: ModelSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionsQuery = {
  listSessions?:  {
    __typename: "ModelSessionConnection",
    items?:  Array< {
      __typename: "Session",
      id: string,
      event_id: string,
      session_name: string,
      session_desc?: string | null,
      start_date?: string | null,
      end_date?: string | null,
      presenters?:  {
        __typename: "ModelPresenterConnection",
        items?:  Array< {
          __typename: "Presenter",
          id: string,
          session_id: string,
          title?: string | null,
          first_name: string,
          last_name: string,
          email?: string | null,
          company?: string | null,
          profile_img?: string | null,
          social_medias?:  {
            __typename: "ModelPresenterSocialMediaConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      hall?:  {
        __typename: "Hall",
        id: string,
        hall_name: string,
        hall_desc?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      stages?:  {
        __typename: "ModelStageConnection",
        items?:  Array< {
          __typename: "Stage",
          id: string,
          session_id: string,
          stage_name: string,
          stage_desc?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      webinars?:  {
        __typename: "ModelWebinarConnection",
        items?:  Array< {
          __typename: "Webinar",
          id: string,
          session_id: string,
          webinar_name: string,
          webinar_desc?: string | null,
          webinar_type?: string | null,
          webinar_api_key?: string | null,
          webinar_url?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetPresenterQueryVariables = {
  id?: string,
};

export type GetPresenterQuery = {
  getPresenter?:  {
    __typename: "Presenter",
    id: string,
    session_id: string,
    title?: string | null,
    first_name: string,
    last_name: string,
    email?: string | null,
    company?: string | null,
    profile_img?: string | null,
    social_medias?:  {
      __typename: "ModelPresenterSocialMediaConnection",
      items?:  Array< {
        __typename: "PresenterSocialMedia",
        id: string,
        presenter_id: string,
        site: string,
        link?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPresentersQueryVariables = {
  filter?: ModelPresenterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPresentersQuery = {
  listPresenters?:  {
    __typename: "ModelPresenterConnection",
    items?:  Array< {
      __typename: "Presenter",
      id: string,
      session_id: string,
      title?: string | null,
      first_name: string,
      last_name: string,
      email?: string | null,
      company?: string | null,
      profile_img?: string | null,
      social_medias?:  {
        __typename: "ModelPresenterSocialMediaConnection",
        items?:  Array< {
          __typename: "PresenterSocialMedia",
          id: string,
          presenter_id: string,
          site: string,
          link?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTableQueryVariables = {
  id?: string,
};

export type GetTableQuery = {
  getTable?:  {
    __typename: "Table",
    id: string,
    event_id: string,
    table_name: string,
    capacity?: number | null,
    table_logo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTablesQueryVariables = {
  filter?: ModelTableFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTablesQuery = {
  listTables?:  {
    __typename: "ModelTableConnection",
    items?:  Array< {
      __typename: "Table",
      id: string,
      event_id: string,
      table_name: string,
      capacity?: number | null,
      table_logo?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetHallQueryVariables = {
  id?: string,
};

export type GetHallQuery = {
  getHall?:  {
    __typename: "Hall",
    id: string,
    hall_name: string,
    hall_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListHallsQueryVariables = {
  filter?: ModelHallFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHallsQuery = {
  listHalls?:  {
    __typename: "ModelHallConnection",
    items?:  Array< {
      __typename: "Hall",
      id: string,
      hall_name: string,
      hall_desc?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetStageQueryVariables = {
  id?: string,
};

export type GetStageQuery = {
  getStage?:  {
    __typename: "Stage",
    id: string,
    session_id: string,
    stage_name: string,
    stage_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListStagesQueryVariables = {
  filter?: ModelStageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStagesQuery = {
  listStages?:  {
    __typename: "ModelStageConnection",
    items?:  Array< {
      __typename: "Stage",
      id: string,
      session_id: string,
      stage_name: string,
      stage_desc?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetWebinarQueryVariables = {
  id?: string,
};

export type GetWebinarQuery = {
  getWebinar?:  {
    __typename: "Webinar",
    id: string,
    session_id: string,
    webinar_name: string,
    webinar_desc?: string | null,
    webinar_type?: string | null,
    webinar_api_key?: string | null,
    webinar_url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListWebinarsQueryVariables = {
  filter?: ModelWebinarFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWebinarsQuery = {
  listWebinars?:  {
    __typename: "ModelWebinarConnection",
    items?:  Array< {
      __typename: "Webinar",
      id: string,
      session_id: string,
      webinar_name: string,
      webinar_desc?: string | null,
      webinar_type?: string | null,
      webinar_api_key?: string | null,
      webinar_url?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetPresenterSocialMediaQueryVariables = {
  id?: string,
};

export type GetPresenterSocialMediaQuery = {
  getPresenterSocialMedia?:  {
    __typename: "PresenterSocialMedia",
    id: string,
    presenter_id: string,
    site: string,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPresenterSocialMediasQueryVariables = {
  filter?: ModelPresenterSocialMediaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPresenterSocialMediasQuery = {
  listPresenterSocialMedias?:  {
    __typename: "ModelPresenterSocialMediaConnection",
    items?:  Array< {
      __typename: "PresenterSocialMedia",
      id: string,
      presenter_id: string,
      site: string,
      link?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id?: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    cognito_sub: string,
    title?: string | null,
    first_name?: string | null,
    last_name?: string | null,
    job_title?: string | null,
    profile_img?: string | null,
    ignore?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      cognito_sub: string,
      title?: string | null,
      first_name?: string | null,
      last_name?: string | null,
      job_title?: string | null,
      profile_img?: string | null,
      ignore?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserEventGroupQueryVariables = {
  id?: string,
};

export type GetUserEventGroupQuery = {
  getUserEventGroup?:  {
    __typename: "UserEventGroup",
    id: string,
    join_id: string,
    name: string,
    active?: boolean | null,
    user?:  {
      __typename: "UserEventJoin",
      id: string,
      cognito_sub: string,
      client_id: string,
      event?:  {
        __typename: "Event",
        id: string,
        client_id: string,
        event_name: string,
        event_logo?: string | null,
        event_desc?: string | null,
        start_date?: string | null,
        end_date?: string | null,
        timezone_abbr?: string | null,
        primary_domain?: string | null,
        other_domains?: Array< string | null > | null,
        address?: string | null,
        city?: string | null,
        county?: string | null,
        country?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        sessions?:  {
          __typename: "ModelSessionConnection",
          items?:  Array< {
            __typename: "Session",
            id: string,
            event_id: string,
            session_name: string,
            session_desc?: string | null,
            start_date?: string | null,
            end_date?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        tables?:  {
          __typename: "ModelTableConnection",
          items?:  Array< {
            __typename: "Table",
            id: string,
            event_id: string,
            table_name: string,
            capacity?: number | null,
            table_logo?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      groups?:  {
        __typename: "ModelUserEventGroupConnection",
        items?:  Array< {
          __typename: "UserEventGroup",
          id: string,
          join_id: string,
          name: string,
          active?: boolean | null,
          user?:  {
            __typename: "UserEventJoin",
            id: string,
            cognito_sub: string,
            client_id: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserEventGroupsQueryVariables = {
  filter?: ModelUserEventGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserEventGroupsQuery = {
  listUserEventGroups?:  {
    __typename: "ModelUserEventGroupConnection",
    items?:  Array< {
      __typename: "UserEventGroup",
      id: string,
      join_id: string,
      name: string,
      active?: boolean | null,
      user?:  {
        __typename: "UserEventJoin",
        id: string,
        cognito_sub: string,
        client_id: string,
        event?:  {
          __typename: "Event",
          id: string,
          client_id: string,
          event_name: string,
          event_logo?: string | null,
          event_desc?: string | null,
          start_date?: string | null,
          end_date?: string | null,
          timezone_abbr?: string | null,
          primary_domain?: string | null,
          other_domains?: Array< string | null > | null,
          address?: string | null,
          city?: string | null,
          county?: string | null,
          country?: string | null,
          archived?: boolean | null,
          archive_date?: string | null,
          sessions?:  {
            __typename: "ModelSessionConnection",
            nextToken?: string | null,
          } | null,
          tables?:  {
            __typename: "ModelTableConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        groups?:  {
          __typename: "ModelUserEventGroupConnection",
          items?:  Array< {
            __typename: "UserEventGroup",
            id: string,
            join_id: string,
            name: string,
            active?: boolean | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserEventJoinQueryVariables = {
  id?: string,
};

export type GetUserEventJoinQuery = {
  getUserEventJoin?:  {
    __typename: "UserEventJoin",
    id: string,
    cognito_sub: string,
    client_id: string,
    event?:  {
      __typename: "Event",
      id: string,
      client_id: string,
      event_name: string,
      event_logo?: string | null,
      event_desc?: string | null,
      start_date?: string | null,
      end_date?: string | null,
      timezone_abbr?: string | null,
      primary_domain?: string | null,
      other_domains?: Array< string | null > | null,
      address?: string | null,
      city?: string | null,
      county?: string | null,
      country?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      sessions?:  {
        __typename: "ModelSessionConnection",
        items?:  Array< {
          __typename: "Session",
          id: string,
          event_id: string,
          session_name: string,
          session_desc?: string | null,
          start_date?: string | null,
          end_date?: string | null,
          presenters?:  {
            __typename: "ModelPresenterConnection",
            nextToken?: string | null,
          } | null,
          hall?:  {
            __typename: "Hall",
            id: string,
            hall_name: string,
            hall_desc?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          stages?:  {
            __typename: "ModelStageConnection",
            nextToken?: string | null,
          } | null,
          webinars?:  {
            __typename: "ModelWebinarConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      tables?:  {
        __typename: "ModelTableConnection",
        items?:  Array< {
          __typename: "Table",
          id: string,
          event_id: string,
          table_name: string,
          capacity?: number | null,
          table_logo?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    groups?:  {
      __typename: "ModelUserEventGroupConnection",
      items?:  Array< {
        __typename: "UserEventGroup",
        id: string,
        join_id: string,
        name: string,
        active?: boolean | null,
        user?:  {
          __typename: "UserEventJoin",
          id: string,
          cognito_sub: string,
          client_id: string,
          event?:  {
            __typename: "Event",
            id: string,
            client_id: string,
            event_name: string,
            event_logo?: string | null,
            event_desc?: string | null,
            start_date?: string | null,
            end_date?: string | null,
            timezone_abbr?: string | null,
            primary_domain?: string | null,
            other_domains?: Array< string | null > | null,
            address?: string | null,
            city?: string | null,
            county?: string | null,
            country?: string | null,
            archived?: boolean | null,
            archive_date?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          groups?:  {
            __typename: "ModelUserEventGroupConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserEventJoinsQueryVariables = {
  filter?: ModelUserEventJoinFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserEventJoinsQuery = {
  listUserEventJoins?:  {
    __typename: "ModelUserEventJoinConnection",
    items?:  Array< {
      __typename: "UserEventJoin",
      id: string,
      cognito_sub: string,
      client_id: string,
      event?:  {
        __typename: "Event",
        id: string,
        client_id: string,
        event_name: string,
        event_logo?: string | null,
        event_desc?: string | null,
        start_date?: string | null,
        end_date?: string | null,
        timezone_abbr?: string | null,
        primary_domain?: string | null,
        other_domains?: Array< string | null > | null,
        address?: string | null,
        city?: string | null,
        county?: string | null,
        country?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        sessions?:  {
          __typename: "ModelSessionConnection",
          items?:  Array< {
            __typename: "Session",
            id: string,
            event_id: string,
            session_name: string,
            session_desc?: string | null,
            start_date?: string | null,
            end_date?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        tables?:  {
          __typename: "ModelTableConnection",
          items?:  Array< {
            __typename: "Table",
            id: string,
            event_id: string,
            table_name: string,
            capacity?: number | null,
            table_logo?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      groups?:  {
        __typename: "ModelUserEventGroupConnection",
        items?:  Array< {
          __typename: "UserEventGroup",
          id: string,
          join_id: string,
          name: string,
          active?: boolean | null,
          user?:  {
            __typename: "UserEventJoin",
            id: string,
            cognito_sub: string,
            client_id: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTrueChatRoomQueryVariables = {
  id?: string,
};

export type GetTrueChatRoomQuery = {
  getTrueChatRoom?:  {
    __typename: "TrueChatRoom",
    id: string,
    room_name: string,
    messages?:  {
      __typename: "ModelTrueChatMessageConnection",
      items?:  Array< {
        __typename: "TrueChatMessage",
        id: string,
        cognito_sub: string,
        room_id: string,
        message: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTrueChatRoomsQueryVariables = {
  filter?: ModelTrueChatRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTrueChatRoomsQuery = {
  listTrueChatRooms?:  {
    __typename: "ModelTrueChatRoomConnection",
    items?:  Array< {
      __typename: "TrueChatRoom",
      id: string,
      room_name: string,
      messages?:  {
        __typename: "ModelTrueChatMessageConnection",
        items?:  Array< {
          __typename: "TrueChatMessage",
          id: string,
          cognito_sub: string,
          room_id: string,
          message: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTrueChatMessageQueryVariables = {
  id?: string,
};

export type GetTrueChatMessageQuery = {
  getTrueChatMessage?:  {
    __typename: "TrueChatMessage",
    id: string,
    cognito_sub: string,
    room_id: string,
    message: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTrueChatMessagesQueryVariables = {
  filter?: ModelTrueChatMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTrueChatMessagesQuery = {
  listTrueChatMessages?:  {
    __typename: "ModelTrueChatMessageConnection",
    items?:  Array< {
      __typename: "TrueChatMessage",
      id: string,
      cognito_sub: string,
      room_id: string,
      message: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetFavouriteQueryVariables = {
  id?: string,
};

export type GetFavouriteQuery = {
  getFavourite?:  {
    __typename: "Favourite",
    id: string,
    cognito_sub: string,
    client_id: string,
    event_id: string,
    session_id?: string | null,
    presenter_id?: string | null,
    attendee_cognito_sub?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFavouritesQueryVariables = {
  filter?: ModelFavouriteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFavouritesQuery = {
  listFavourites?:  {
    __typename: "ModelFavouriteConnection",
    items?:  Array< {
      __typename: "Favourite",
      id: string,
      cognito_sub: string,
      client_id: string,
      event_id: string,
      session_id?: string | null,
      presenter_id?: string | null,
      attendee_cognito_sub?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserClientJoinQueryVariables = {
  id?: string,
};

export type GetUserClientJoinQuery = {
  getUserClientJoin?:  {
    __typename: "UserClientJoin",
    id: string,
    cognito_sub: string,
    client?:  {
      __typename: "Client",
      id: string,
      join_id: string,
      full_name: string,
      friendly_name: string,
      clientdb_instance?: string | null,
      address?: string | null,
      county?: string | null,
      country?: string | null,
      logo?: string | null,
      join_date?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      primary_contact?: string | null,
      contact_email?: string | null,
      contact_phone?: string | null,
      account_manager?: string | null,
      user?:  {
        __typename: "UserClientJoin",
        id: string,
        cognito_sub: string,
        client?:  {
          __typename: "Client",
          id: string,
          join_id: string,
          full_name: string,
          friendly_name: string,
          clientdb_instance?: string | null,
          address?: string | null,
          county?: string | null,
          country?: string | null,
          logo?: string | null,
          join_date?: string | null,
          archived?: boolean | null,
          archive_date?: string | null,
          primary_contact?: string | null,
          contact_email?: string | null,
          contact_phone?: string | null,
          account_manager?: string | null,
          user?:  {
            __typename: "UserClientJoin",
            id: string,
            cognito_sub: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserClientJoinsQueryVariables = {
  filter?: ModelUserClientJoinFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserClientJoinsQuery = {
  listUserClientJoins?:  {
    __typename: "ModelUserClientJoinConnection",
    items?:  Array< {
      __typename: "UserClientJoin",
      id: string,
      cognito_sub: string,
      client?:  {
        __typename: "Client",
        id: string,
        join_id: string,
        full_name: string,
        friendly_name: string,
        clientdb_instance?: string | null,
        address?: string | null,
        county?: string | null,
        country?: string | null,
        logo?: string | null,
        join_date?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        primary_contact?: string | null,
        contact_email?: string | null,
        contact_phone?: string | null,
        account_manager?: string | null,
        user?:  {
          __typename: "UserClientJoin",
          id: string,
          cognito_sub: string,
          client?:  {
            __typename: "Client",
            id: string,
            join_id: string,
            full_name: string,
            friendly_name: string,
            clientdb_instance?: string | null,
            address?: string | null,
            county?: string | null,
            country?: string | null,
            logo?: string | null,
            join_date?: string | null,
            archived?: boolean | null,
            archive_date?: string | null,
            primary_contact?: string | null,
            contact_email?: string | null,
            contact_phone?: string | null,
            account_manager?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetClientQueryVariables = {
  id?: string,
};

export type GetClientQuery = {
  getClient?:  {
    __typename: "Client",
    id: string,
    join_id: string,
    full_name: string,
    friendly_name: string,
    clientdb_instance?: string | null,
    address?: string | null,
    county?: string | null,
    country?: string | null,
    logo?: string | null,
    join_date?: string | null,
    archived?: boolean | null,
    archive_date?: string | null,
    primary_contact?: string | null,
    contact_email?: string | null,
    contact_phone?: string | null,
    account_manager?: string | null,
    user?:  {
      __typename: "UserClientJoin",
      id: string,
      cognito_sub: string,
      client?:  {
        __typename: "Client",
        id: string,
        join_id: string,
        full_name: string,
        friendly_name: string,
        clientdb_instance?: string | null,
        address?: string | null,
        county?: string | null,
        country?: string | null,
        logo?: string | null,
        join_date?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        primary_contact?: string | null,
        contact_email?: string | null,
        contact_phone?: string | null,
        account_manager?: string | null,
        user?:  {
          __typename: "UserClientJoin",
          id: string,
          cognito_sub: string,
          client?:  {
            __typename: "Client",
            id: string,
            join_id: string,
            full_name: string,
            friendly_name: string,
            clientdb_instance?: string | null,
            address?: string | null,
            county?: string | null,
            country?: string | null,
            logo?: string | null,
            join_date?: string | null,
            archived?: boolean | null,
            archive_date?: string | null,
            primary_contact?: string | null,
            contact_email?: string | null,
            contact_phone?: string | null,
            account_manager?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListClientsQueryVariables = {
  filter?: ModelClientFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClientsQuery = {
  listClients?:  {
    __typename: "ModelClientConnection",
    items?:  Array< {
      __typename: "Client",
      id: string,
      join_id: string,
      full_name: string,
      friendly_name: string,
      clientdb_instance?: string | null,
      address?: string | null,
      county?: string | null,
      country?: string | null,
      logo?: string | null,
      join_date?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      primary_contact?: string | null,
      contact_email?: string | null,
      contact_phone?: string | null,
      account_manager?: string | null,
      user?:  {
        __typename: "UserClientJoin",
        id: string,
        cognito_sub: string,
        client?:  {
          __typename: "Client",
          id: string,
          join_id: string,
          full_name: string,
          friendly_name: string,
          clientdb_instance?: string | null,
          address?: string | null,
          county?: string | null,
          country?: string | null,
          logo?: string | null,
          join_date?: string | null,
          archived?: boolean | null,
          archive_date?: string | null,
          primary_contact?: string | null,
          contact_email?: string | null,
          contact_phone?: string | null,
          account_manager?: string | null,
          user?:  {
            __typename: "UserClientJoin",
            id: string,
            cognito_sub: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetSettingQueryVariables = {
  id?: string,
};

export type GetSettingQuery = {
  getSetting?:  {
    __typename: "Setting",
    id: string,
    setting: string,
    value?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSettingsQueryVariables = {
  filter?: ModelSettingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSettingsQuery = {
  listSettings?:  {
    __typename: "ModelSettingConnection",
    items?:  Array< {
      __typename: "Setting",
      id: string,
      setting: string,
      value?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateEventSubscription = {
  onCreateEvent?:  {
    __typename: "Event",
    id: string,
    client_id: string,
    event_name: string,
    event_logo?: string | null,
    event_desc?: string | null,
    start_date?: string | null,
    end_date?: string | null,
    timezone_abbr?: string | null,
    primary_domain?: string | null,
    other_domains?: Array< string | null > | null,
    address?: string | null,
    city?: string | null,
    county?: string | null,
    country?: string | null,
    archived?: boolean | null,
    archive_date?: string | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      items?:  Array< {
        __typename: "Session",
        id: string,
        event_id: string,
        session_name: string,
        session_desc?: string | null,
        start_date?: string | null,
        end_date?: string | null,
        presenters?:  {
          __typename: "ModelPresenterConnection",
          items?:  Array< {
            __typename: "Presenter",
            id: string,
            session_id: string,
            title?: string | null,
            first_name: string,
            last_name: string,
            email?: string | null,
            company?: string | null,
            profile_img?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        hall?:  {
          __typename: "Hall",
          id: string,
          hall_name: string,
          hall_desc?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        stages?:  {
          __typename: "ModelStageConnection",
          items?:  Array< {
            __typename: "Stage",
            id: string,
            session_id: string,
            stage_name: string,
            stage_desc?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        webinars?:  {
          __typename: "ModelWebinarConnection",
          items?:  Array< {
            __typename: "Webinar",
            id: string,
            session_id: string,
            webinar_name: string,
            webinar_desc?: string | null,
            webinar_type?: string | null,
            webinar_api_key?: string | null,
            webinar_url?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    tables?:  {
      __typename: "ModelTableConnection",
      items?:  Array< {
        __typename: "Table",
        id: string,
        event_id: string,
        table_name: string,
        capacity?: number | null,
        table_logo?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateEventSubscription = {
  onUpdateEvent?:  {
    __typename: "Event",
    id: string,
    client_id: string,
    event_name: string,
    event_logo?: string | null,
    event_desc?: string | null,
    start_date?: string | null,
    end_date?: string | null,
    timezone_abbr?: string | null,
    primary_domain?: string | null,
    other_domains?: Array< string | null > | null,
    address?: string | null,
    city?: string | null,
    county?: string | null,
    country?: string | null,
    archived?: boolean | null,
    archive_date?: string | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      items?:  Array< {
        __typename: "Session",
        id: string,
        event_id: string,
        session_name: string,
        session_desc?: string | null,
        start_date?: string | null,
        end_date?: string | null,
        presenters?:  {
          __typename: "ModelPresenterConnection",
          items?:  Array< {
            __typename: "Presenter",
            id: string,
            session_id: string,
            title?: string | null,
            first_name: string,
            last_name: string,
            email?: string | null,
            company?: string | null,
            profile_img?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        hall?:  {
          __typename: "Hall",
          id: string,
          hall_name: string,
          hall_desc?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        stages?:  {
          __typename: "ModelStageConnection",
          items?:  Array< {
            __typename: "Stage",
            id: string,
            session_id: string,
            stage_name: string,
            stage_desc?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        webinars?:  {
          __typename: "ModelWebinarConnection",
          items?:  Array< {
            __typename: "Webinar",
            id: string,
            session_id: string,
            webinar_name: string,
            webinar_desc?: string | null,
            webinar_type?: string | null,
            webinar_api_key?: string | null,
            webinar_url?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    tables?:  {
      __typename: "ModelTableConnection",
      items?:  Array< {
        __typename: "Table",
        id: string,
        event_id: string,
        table_name: string,
        capacity?: number | null,
        table_logo?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteEventSubscription = {
  onDeleteEvent?:  {
    __typename: "Event",
    id: string,
    client_id: string,
    event_name: string,
    event_logo?: string | null,
    event_desc?: string | null,
    start_date?: string | null,
    end_date?: string | null,
    timezone_abbr?: string | null,
    primary_domain?: string | null,
    other_domains?: Array< string | null > | null,
    address?: string | null,
    city?: string | null,
    county?: string | null,
    country?: string | null,
    archived?: boolean | null,
    archive_date?: string | null,
    sessions?:  {
      __typename: "ModelSessionConnection",
      items?:  Array< {
        __typename: "Session",
        id: string,
        event_id: string,
        session_name: string,
        session_desc?: string | null,
        start_date?: string | null,
        end_date?: string | null,
        presenters?:  {
          __typename: "ModelPresenterConnection",
          items?:  Array< {
            __typename: "Presenter",
            id: string,
            session_id: string,
            title?: string | null,
            first_name: string,
            last_name: string,
            email?: string | null,
            company?: string | null,
            profile_img?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        hall?:  {
          __typename: "Hall",
          id: string,
          hall_name: string,
          hall_desc?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        stages?:  {
          __typename: "ModelStageConnection",
          items?:  Array< {
            __typename: "Stage",
            id: string,
            session_id: string,
            stage_name: string,
            stage_desc?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        webinars?:  {
          __typename: "ModelWebinarConnection",
          items?:  Array< {
            __typename: "Webinar",
            id: string,
            session_id: string,
            webinar_name: string,
            webinar_desc?: string | null,
            webinar_type?: string | null,
            webinar_api_key?: string | null,
            webinar_url?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    tables?:  {
      __typename: "ModelTableConnection",
      items?:  Array< {
        __typename: "Table",
        id: string,
        event_id: string,
        table_name: string,
        capacity?: number | null,
        table_logo?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSessionSubscription = {
  onCreateSession?:  {
    __typename: "Session",
    id: string,
    event_id: string,
    session_name: string,
    session_desc?: string | null,
    start_date?: string | null,
    end_date?: string | null,
    presenters?:  {
      __typename: "ModelPresenterConnection",
      items?:  Array< {
        __typename: "Presenter",
        id: string,
        session_id: string,
        title?: string | null,
        first_name: string,
        last_name: string,
        email?: string | null,
        company?: string | null,
        profile_img?: string | null,
        social_medias?:  {
          __typename: "ModelPresenterSocialMediaConnection",
          items?:  Array< {
            __typename: "PresenterSocialMedia",
            id: string,
            presenter_id: string,
            site: string,
            link?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    hall?:  {
      __typename: "Hall",
      id: string,
      hall_name: string,
      hall_desc?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    stages?:  {
      __typename: "ModelStageConnection",
      items?:  Array< {
        __typename: "Stage",
        id: string,
        session_id: string,
        stage_name: string,
        stage_desc?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    webinars?:  {
      __typename: "ModelWebinarConnection",
      items?:  Array< {
        __typename: "Webinar",
        id: string,
        session_id: string,
        webinar_name: string,
        webinar_desc?: string | null,
        webinar_type?: string | null,
        webinar_api_key?: string | null,
        webinar_url?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSessionSubscription = {
  onUpdateSession?:  {
    __typename: "Session",
    id: string,
    event_id: string,
    session_name: string,
    session_desc?: string | null,
    start_date?: string | null,
    end_date?: string | null,
    presenters?:  {
      __typename: "ModelPresenterConnection",
      items?:  Array< {
        __typename: "Presenter",
        id: string,
        session_id: string,
        title?: string | null,
        first_name: string,
        last_name: string,
        email?: string | null,
        company?: string | null,
        profile_img?: string | null,
        social_medias?:  {
          __typename: "ModelPresenterSocialMediaConnection",
          items?:  Array< {
            __typename: "PresenterSocialMedia",
            id: string,
            presenter_id: string,
            site: string,
            link?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    hall?:  {
      __typename: "Hall",
      id: string,
      hall_name: string,
      hall_desc?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    stages?:  {
      __typename: "ModelStageConnection",
      items?:  Array< {
        __typename: "Stage",
        id: string,
        session_id: string,
        stage_name: string,
        stage_desc?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    webinars?:  {
      __typename: "ModelWebinarConnection",
      items?:  Array< {
        __typename: "Webinar",
        id: string,
        session_id: string,
        webinar_name: string,
        webinar_desc?: string | null,
        webinar_type?: string | null,
        webinar_api_key?: string | null,
        webinar_url?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSessionSubscription = {
  onDeleteSession?:  {
    __typename: "Session",
    id: string,
    event_id: string,
    session_name: string,
    session_desc?: string | null,
    start_date?: string | null,
    end_date?: string | null,
    presenters?:  {
      __typename: "ModelPresenterConnection",
      items?:  Array< {
        __typename: "Presenter",
        id: string,
        session_id: string,
        title?: string | null,
        first_name: string,
        last_name: string,
        email?: string | null,
        company?: string | null,
        profile_img?: string | null,
        social_medias?:  {
          __typename: "ModelPresenterSocialMediaConnection",
          items?:  Array< {
            __typename: "PresenterSocialMedia",
            id: string,
            presenter_id: string,
            site: string,
            link?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    hall?:  {
      __typename: "Hall",
      id: string,
      hall_name: string,
      hall_desc?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    stages?:  {
      __typename: "ModelStageConnection",
      items?:  Array< {
        __typename: "Stage",
        id: string,
        session_id: string,
        stage_name: string,
        stage_desc?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    webinars?:  {
      __typename: "ModelWebinarConnection",
      items?:  Array< {
        __typename: "Webinar",
        id: string,
        session_id: string,
        webinar_name: string,
        webinar_desc?: string | null,
        webinar_type?: string | null,
        webinar_api_key?: string | null,
        webinar_url?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePresenterSubscription = {
  onCreatePresenter?:  {
    __typename: "Presenter",
    id: string,
    session_id: string,
    title?: string | null,
    first_name: string,
    last_name: string,
    email?: string | null,
    company?: string | null,
    profile_img?: string | null,
    social_medias?:  {
      __typename: "ModelPresenterSocialMediaConnection",
      items?:  Array< {
        __typename: "PresenterSocialMedia",
        id: string,
        presenter_id: string,
        site: string,
        link?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePresenterSubscription = {
  onUpdatePresenter?:  {
    __typename: "Presenter",
    id: string,
    session_id: string,
    title?: string | null,
    first_name: string,
    last_name: string,
    email?: string | null,
    company?: string | null,
    profile_img?: string | null,
    social_medias?:  {
      __typename: "ModelPresenterSocialMediaConnection",
      items?:  Array< {
        __typename: "PresenterSocialMedia",
        id: string,
        presenter_id: string,
        site: string,
        link?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePresenterSubscription = {
  onDeletePresenter?:  {
    __typename: "Presenter",
    id: string,
    session_id: string,
    title?: string | null,
    first_name: string,
    last_name: string,
    email?: string | null,
    company?: string | null,
    profile_img?: string | null,
    social_medias?:  {
      __typename: "ModelPresenterSocialMediaConnection",
      items?:  Array< {
        __typename: "PresenterSocialMedia",
        id: string,
        presenter_id: string,
        site: string,
        link?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTableSubscription = {
  onCreateTable?:  {
    __typename: "Table",
    id: string,
    event_id: string,
    table_name: string,
    capacity?: number | null,
    table_logo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTableSubscription = {
  onUpdateTable?:  {
    __typename: "Table",
    id: string,
    event_id: string,
    table_name: string,
    capacity?: number | null,
    table_logo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTableSubscription = {
  onDeleteTable?:  {
    __typename: "Table",
    id: string,
    event_id: string,
    table_name: string,
    capacity?: number | null,
    table_logo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateHallSubscription = {
  onCreateHall?:  {
    __typename: "Hall",
    id: string,
    hall_name: string,
    hall_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateHallSubscription = {
  onUpdateHall?:  {
    __typename: "Hall",
    id: string,
    hall_name: string,
    hall_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteHallSubscription = {
  onDeleteHall?:  {
    __typename: "Hall",
    id: string,
    hall_name: string,
    hall_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateStageSubscription = {
  onCreateStage?:  {
    __typename: "Stage",
    id: string,
    session_id: string,
    stage_name: string,
    stage_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateStageSubscription = {
  onUpdateStage?:  {
    __typename: "Stage",
    id: string,
    session_id: string,
    stage_name: string,
    stage_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteStageSubscription = {
  onDeleteStage?:  {
    __typename: "Stage",
    id: string,
    session_id: string,
    stage_name: string,
    stage_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateWebinarSubscription = {
  onCreateWebinar?:  {
    __typename: "Webinar",
    id: string,
    session_id: string,
    webinar_name: string,
    webinar_desc?: string | null,
    webinar_type?: string | null,
    webinar_api_key?: string | null,
    webinar_url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateWebinarSubscription = {
  onUpdateWebinar?:  {
    __typename: "Webinar",
    id: string,
    session_id: string,
    webinar_name: string,
    webinar_desc?: string | null,
    webinar_type?: string | null,
    webinar_api_key?: string | null,
    webinar_url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteWebinarSubscription = {
  onDeleteWebinar?:  {
    __typename: "Webinar",
    id: string,
    session_id: string,
    webinar_name: string,
    webinar_desc?: string | null,
    webinar_type?: string | null,
    webinar_api_key?: string | null,
    webinar_url?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePresenterSocialMediaSubscription = {
  onCreatePresenterSocialMedia?:  {
    __typename: "PresenterSocialMedia",
    id: string,
    presenter_id: string,
    site: string,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePresenterSocialMediaSubscription = {
  onUpdatePresenterSocialMedia?:  {
    __typename: "PresenterSocialMedia",
    id: string,
    presenter_id: string,
    site: string,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePresenterSocialMediaSubscription = {
  onDeletePresenterSocialMedia?:  {
    __typename: "PresenterSocialMedia",
    id: string,
    presenter_id: string,
    site: string,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    cognito_sub: string,
    title?: string | null,
    first_name?: string | null,
    last_name?: string | null,
    job_title?: string | null,
    profile_img?: string | null,
    ignore?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    cognito_sub: string,
    title?: string | null,
    first_name?: string | null,
    last_name?: string | null,
    job_title?: string | null,
    profile_img?: string | null,
    ignore?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    cognito_sub: string,
    title?: string | null,
    first_name?: string | null,
    last_name?: string | null,
    job_title?: string | null,
    profile_img?: string | null,
    ignore?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserEventGroupSubscription = {
  onCreateUserEventGroup?:  {
    __typename: "UserEventGroup",
    id: string,
    join_id: string,
    name: string,
    active?: boolean | null,
    user?:  {
      __typename: "UserEventJoin",
      id: string,
      cognito_sub: string,
      client_id: string,
      event?:  {
        __typename: "Event",
        id: string,
        client_id: string,
        event_name: string,
        event_logo?: string | null,
        event_desc?: string | null,
        start_date?: string | null,
        end_date?: string | null,
        timezone_abbr?: string | null,
        primary_domain?: string | null,
        other_domains?: Array< string | null > | null,
        address?: string | null,
        city?: string | null,
        county?: string | null,
        country?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        sessions?:  {
          __typename: "ModelSessionConnection",
          items?:  Array< {
            __typename: "Session",
            id: string,
            event_id: string,
            session_name: string,
            session_desc?: string | null,
            start_date?: string | null,
            end_date?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        tables?:  {
          __typename: "ModelTableConnection",
          items?:  Array< {
            __typename: "Table",
            id: string,
            event_id: string,
            table_name: string,
            capacity?: number | null,
            table_logo?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      groups?:  {
        __typename: "ModelUserEventGroupConnection",
        items?:  Array< {
          __typename: "UserEventGroup",
          id: string,
          join_id: string,
          name: string,
          active?: boolean | null,
          user?:  {
            __typename: "UserEventJoin",
            id: string,
            cognito_sub: string,
            client_id: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserEventGroupSubscription = {
  onUpdateUserEventGroup?:  {
    __typename: "UserEventGroup",
    id: string,
    join_id: string,
    name: string,
    active?: boolean | null,
    user?:  {
      __typename: "UserEventJoin",
      id: string,
      cognito_sub: string,
      client_id: string,
      event?:  {
        __typename: "Event",
        id: string,
        client_id: string,
        event_name: string,
        event_logo?: string | null,
        event_desc?: string | null,
        start_date?: string | null,
        end_date?: string | null,
        timezone_abbr?: string | null,
        primary_domain?: string | null,
        other_domains?: Array< string | null > | null,
        address?: string | null,
        city?: string | null,
        county?: string | null,
        country?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        sessions?:  {
          __typename: "ModelSessionConnection",
          items?:  Array< {
            __typename: "Session",
            id: string,
            event_id: string,
            session_name: string,
            session_desc?: string | null,
            start_date?: string | null,
            end_date?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        tables?:  {
          __typename: "ModelTableConnection",
          items?:  Array< {
            __typename: "Table",
            id: string,
            event_id: string,
            table_name: string,
            capacity?: number | null,
            table_logo?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      groups?:  {
        __typename: "ModelUserEventGroupConnection",
        items?:  Array< {
          __typename: "UserEventGroup",
          id: string,
          join_id: string,
          name: string,
          active?: boolean | null,
          user?:  {
            __typename: "UserEventJoin",
            id: string,
            cognito_sub: string,
            client_id: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserEventGroupSubscription = {
  onDeleteUserEventGroup?:  {
    __typename: "UserEventGroup",
    id: string,
    join_id: string,
    name: string,
    active?: boolean | null,
    user?:  {
      __typename: "UserEventJoin",
      id: string,
      cognito_sub: string,
      client_id: string,
      event?:  {
        __typename: "Event",
        id: string,
        client_id: string,
        event_name: string,
        event_logo?: string | null,
        event_desc?: string | null,
        start_date?: string | null,
        end_date?: string | null,
        timezone_abbr?: string | null,
        primary_domain?: string | null,
        other_domains?: Array< string | null > | null,
        address?: string | null,
        city?: string | null,
        county?: string | null,
        country?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        sessions?:  {
          __typename: "ModelSessionConnection",
          items?:  Array< {
            __typename: "Session",
            id: string,
            event_id: string,
            session_name: string,
            session_desc?: string | null,
            start_date?: string | null,
            end_date?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        tables?:  {
          __typename: "ModelTableConnection",
          items?:  Array< {
            __typename: "Table",
            id: string,
            event_id: string,
            table_name: string,
            capacity?: number | null,
            table_logo?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null > | null,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      groups?:  {
        __typename: "ModelUserEventGroupConnection",
        items?:  Array< {
          __typename: "UserEventGroup",
          id: string,
          join_id: string,
          name: string,
          active?: boolean | null,
          user?:  {
            __typename: "UserEventJoin",
            id: string,
            cognito_sub: string,
            client_id: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserEventJoinSubscription = {
  onCreateUserEventJoin?:  {
    __typename: "UserEventJoin",
    id: string,
    cognito_sub: string,
    client_id: string,
    event?:  {
      __typename: "Event",
      id: string,
      client_id: string,
      event_name: string,
      event_logo?: string | null,
      event_desc?: string | null,
      start_date?: string | null,
      end_date?: string | null,
      timezone_abbr?: string | null,
      primary_domain?: string | null,
      other_domains?: Array< string | null > | null,
      address?: string | null,
      city?: string | null,
      county?: string | null,
      country?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      sessions?:  {
        __typename: "ModelSessionConnection",
        items?:  Array< {
          __typename: "Session",
          id: string,
          event_id: string,
          session_name: string,
          session_desc?: string | null,
          start_date?: string | null,
          end_date?: string | null,
          presenters?:  {
            __typename: "ModelPresenterConnection",
            nextToken?: string | null,
          } | null,
          hall?:  {
            __typename: "Hall",
            id: string,
            hall_name: string,
            hall_desc?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          stages?:  {
            __typename: "ModelStageConnection",
            nextToken?: string | null,
          } | null,
          webinars?:  {
            __typename: "ModelWebinarConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      tables?:  {
        __typename: "ModelTableConnection",
        items?:  Array< {
          __typename: "Table",
          id: string,
          event_id: string,
          table_name: string,
          capacity?: number | null,
          table_logo?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    groups?:  {
      __typename: "ModelUserEventGroupConnection",
      items?:  Array< {
        __typename: "UserEventGroup",
        id: string,
        join_id: string,
        name: string,
        active?: boolean | null,
        user?:  {
          __typename: "UserEventJoin",
          id: string,
          cognito_sub: string,
          client_id: string,
          event?:  {
            __typename: "Event",
            id: string,
            client_id: string,
            event_name: string,
            event_logo?: string | null,
            event_desc?: string | null,
            start_date?: string | null,
            end_date?: string | null,
            timezone_abbr?: string | null,
            primary_domain?: string | null,
            other_domains?: Array< string | null > | null,
            address?: string | null,
            city?: string | null,
            county?: string | null,
            country?: string | null,
            archived?: boolean | null,
            archive_date?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          groups?:  {
            __typename: "ModelUserEventGroupConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserEventJoinSubscription = {
  onUpdateUserEventJoin?:  {
    __typename: "UserEventJoin",
    id: string,
    cognito_sub: string,
    client_id: string,
    event?:  {
      __typename: "Event",
      id: string,
      client_id: string,
      event_name: string,
      event_logo?: string | null,
      event_desc?: string | null,
      start_date?: string | null,
      end_date?: string | null,
      timezone_abbr?: string | null,
      primary_domain?: string | null,
      other_domains?: Array< string | null > | null,
      address?: string | null,
      city?: string | null,
      county?: string | null,
      country?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      sessions?:  {
        __typename: "ModelSessionConnection",
        items?:  Array< {
          __typename: "Session",
          id: string,
          event_id: string,
          session_name: string,
          session_desc?: string | null,
          start_date?: string | null,
          end_date?: string | null,
          presenters?:  {
            __typename: "ModelPresenterConnection",
            nextToken?: string | null,
          } | null,
          hall?:  {
            __typename: "Hall",
            id: string,
            hall_name: string,
            hall_desc?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          stages?:  {
            __typename: "ModelStageConnection",
            nextToken?: string | null,
          } | null,
          webinars?:  {
            __typename: "ModelWebinarConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      tables?:  {
        __typename: "ModelTableConnection",
        items?:  Array< {
          __typename: "Table",
          id: string,
          event_id: string,
          table_name: string,
          capacity?: number | null,
          table_logo?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    groups?:  {
      __typename: "ModelUserEventGroupConnection",
      items?:  Array< {
        __typename: "UserEventGroup",
        id: string,
        join_id: string,
        name: string,
        active?: boolean | null,
        user?:  {
          __typename: "UserEventJoin",
          id: string,
          cognito_sub: string,
          client_id: string,
          event?:  {
            __typename: "Event",
            id: string,
            client_id: string,
            event_name: string,
            event_logo?: string | null,
            event_desc?: string | null,
            start_date?: string | null,
            end_date?: string | null,
            timezone_abbr?: string | null,
            primary_domain?: string | null,
            other_domains?: Array< string | null > | null,
            address?: string | null,
            city?: string | null,
            county?: string | null,
            country?: string | null,
            archived?: boolean | null,
            archive_date?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          groups?:  {
            __typename: "ModelUserEventGroupConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserEventJoinSubscription = {
  onDeleteUserEventJoin?:  {
    __typename: "UserEventJoin",
    id: string,
    cognito_sub: string,
    client_id: string,
    event?:  {
      __typename: "Event",
      id: string,
      client_id: string,
      event_name: string,
      event_logo?: string | null,
      event_desc?: string | null,
      start_date?: string | null,
      end_date?: string | null,
      timezone_abbr?: string | null,
      primary_domain?: string | null,
      other_domains?: Array< string | null > | null,
      address?: string | null,
      city?: string | null,
      county?: string | null,
      country?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      sessions?:  {
        __typename: "ModelSessionConnection",
        items?:  Array< {
          __typename: "Session",
          id: string,
          event_id: string,
          session_name: string,
          session_desc?: string | null,
          start_date?: string | null,
          end_date?: string | null,
          presenters?:  {
            __typename: "ModelPresenterConnection",
            nextToken?: string | null,
          } | null,
          hall?:  {
            __typename: "Hall",
            id: string,
            hall_name: string,
            hall_desc?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          stages?:  {
            __typename: "ModelStageConnection",
            nextToken?: string | null,
          } | null,
          webinars?:  {
            __typename: "ModelWebinarConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      tables?:  {
        __typename: "ModelTableConnection",
        items?:  Array< {
          __typename: "Table",
          id: string,
          event_id: string,
          table_name: string,
          capacity?: number | null,
          table_logo?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    groups?:  {
      __typename: "ModelUserEventGroupConnection",
      items?:  Array< {
        __typename: "UserEventGroup",
        id: string,
        join_id: string,
        name: string,
        active?: boolean | null,
        user?:  {
          __typename: "UserEventJoin",
          id: string,
          cognito_sub: string,
          client_id: string,
          event?:  {
            __typename: "Event",
            id: string,
            client_id: string,
            event_name: string,
            event_logo?: string | null,
            event_desc?: string | null,
            start_date?: string | null,
            end_date?: string | null,
            timezone_abbr?: string | null,
            primary_domain?: string | null,
            other_domains?: Array< string | null > | null,
            address?: string | null,
            city?: string | null,
            county?: string | null,
            country?: string | null,
            archived?: boolean | null,
            archive_date?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          groups?:  {
            __typename: "ModelUserEventGroupConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTrueChatRoomSubscription = {
  onCreateTrueChatRoom?:  {
    __typename: "TrueChatRoom",
    id: string,
    room_name: string,
    messages?:  {
      __typename: "ModelTrueChatMessageConnection",
      items?:  Array< {
        __typename: "TrueChatMessage",
        id: string,
        cognito_sub: string,
        room_id: string,
        message: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTrueChatRoomSubscription = {
  onUpdateTrueChatRoom?:  {
    __typename: "TrueChatRoom",
    id: string,
    room_name: string,
    messages?:  {
      __typename: "ModelTrueChatMessageConnection",
      items?:  Array< {
        __typename: "TrueChatMessage",
        id: string,
        cognito_sub: string,
        room_id: string,
        message: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTrueChatRoomSubscription = {
  onDeleteTrueChatRoom?:  {
    __typename: "TrueChatRoom",
    id: string,
    room_name: string,
    messages?:  {
      __typename: "ModelTrueChatMessageConnection",
      items?:  Array< {
        __typename: "TrueChatMessage",
        id: string,
        cognito_sub: string,
        room_id: string,
        message: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTrueChatMessageSubscription = {
  onCreateTrueChatMessage?:  {
    __typename: "TrueChatMessage",
    id: string,
    cognito_sub: string,
    room_id: string,
    message: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTrueChatMessageSubscription = {
  onUpdateTrueChatMessage?:  {
    __typename: "TrueChatMessage",
    id: string,
    cognito_sub: string,
    room_id: string,
    message: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTrueChatMessageSubscription = {
  onDeleteTrueChatMessage?:  {
    __typename: "TrueChatMessage",
    id: string,
    cognito_sub: string,
    room_id: string,
    message: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFavouriteSubscription = {
  onCreateFavourite?:  {
    __typename: "Favourite",
    id: string,
    cognito_sub: string,
    client_id: string,
    event_id: string,
    session_id?: string | null,
    presenter_id?: string | null,
    attendee_cognito_sub?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFavouriteSubscription = {
  onUpdateFavourite?:  {
    __typename: "Favourite",
    id: string,
    cognito_sub: string,
    client_id: string,
    event_id: string,
    session_id?: string | null,
    presenter_id?: string | null,
    attendee_cognito_sub?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFavouriteSubscription = {
  onDeleteFavourite?:  {
    __typename: "Favourite",
    id: string,
    cognito_sub: string,
    client_id: string,
    event_id: string,
    session_id?: string | null,
    presenter_id?: string | null,
    attendee_cognito_sub?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserClientJoinSubscription = {
  onCreateUserClientJoin?:  {
    __typename: "UserClientJoin",
    id: string,
    cognito_sub: string,
    client?:  {
      __typename: "Client",
      id: string,
      join_id: string,
      full_name: string,
      friendly_name: string,
      clientdb_instance?: string | null,
      address?: string | null,
      county?: string | null,
      country?: string | null,
      logo?: string | null,
      join_date?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      primary_contact?: string | null,
      contact_email?: string | null,
      contact_phone?: string | null,
      account_manager?: string | null,
      user?:  {
        __typename: "UserClientJoin",
        id: string,
        cognito_sub: string,
        client?:  {
          __typename: "Client",
          id: string,
          join_id: string,
          full_name: string,
          friendly_name: string,
          clientdb_instance?: string | null,
          address?: string | null,
          county?: string | null,
          country?: string | null,
          logo?: string | null,
          join_date?: string | null,
          archived?: boolean | null,
          archive_date?: string | null,
          primary_contact?: string | null,
          contact_email?: string | null,
          contact_phone?: string | null,
          account_manager?: string | null,
          user?:  {
            __typename: "UserClientJoin",
            id: string,
            cognito_sub: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserClientJoinSubscription = {
  onUpdateUserClientJoin?:  {
    __typename: "UserClientJoin",
    id: string,
    cognito_sub: string,
    client?:  {
      __typename: "Client",
      id: string,
      join_id: string,
      full_name: string,
      friendly_name: string,
      clientdb_instance?: string | null,
      address?: string | null,
      county?: string | null,
      country?: string | null,
      logo?: string | null,
      join_date?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      primary_contact?: string | null,
      contact_email?: string | null,
      contact_phone?: string | null,
      account_manager?: string | null,
      user?:  {
        __typename: "UserClientJoin",
        id: string,
        cognito_sub: string,
        client?:  {
          __typename: "Client",
          id: string,
          join_id: string,
          full_name: string,
          friendly_name: string,
          clientdb_instance?: string | null,
          address?: string | null,
          county?: string | null,
          country?: string | null,
          logo?: string | null,
          join_date?: string | null,
          archived?: boolean | null,
          archive_date?: string | null,
          primary_contact?: string | null,
          contact_email?: string | null,
          contact_phone?: string | null,
          account_manager?: string | null,
          user?:  {
            __typename: "UserClientJoin",
            id: string,
            cognito_sub: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserClientJoinSubscription = {
  onDeleteUserClientJoin?:  {
    __typename: "UserClientJoin",
    id: string,
    cognito_sub: string,
    client?:  {
      __typename: "Client",
      id: string,
      join_id: string,
      full_name: string,
      friendly_name: string,
      clientdb_instance?: string | null,
      address?: string | null,
      county?: string | null,
      country?: string | null,
      logo?: string | null,
      join_date?: string | null,
      archived?: boolean | null,
      archive_date?: string | null,
      primary_contact?: string | null,
      contact_email?: string | null,
      contact_phone?: string | null,
      account_manager?: string | null,
      user?:  {
        __typename: "UserClientJoin",
        id: string,
        cognito_sub: string,
        client?:  {
          __typename: "Client",
          id: string,
          join_id: string,
          full_name: string,
          friendly_name: string,
          clientdb_instance?: string | null,
          address?: string | null,
          county?: string | null,
          country?: string | null,
          logo?: string | null,
          join_date?: string | null,
          archived?: boolean | null,
          archive_date?: string | null,
          primary_contact?: string | null,
          contact_email?: string | null,
          contact_phone?: string | null,
          account_manager?: string | null,
          user?:  {
            __typename: "UserClientJoin",
            id: string,
            cognito_sub: string,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateClientSubscription = {
  onCreateClient?:  {
    __typename: "Client",
    id: string,
    join_id: string,
    full_name: string,
    friendly_name: string,
    clientdb_instance?: string | null,
    address?: string | null,
    county?: string | null,
    country?: string | null,
    logo?: string | null,
    join_date?: string | null,
    archived?: boolean | null,
    archive_date?: string | null,
    primary_contact?: string | null,
    contact_email?: string | null,
    contact_phone?: string | null,
    account_manager?: string | null,
    user?:  {
      __typename: "UserClientJoin",
      id: string,
      cognito_sub: string,
      client?:  {
        __typename: "Client",
        id: string,
        join_id: string,
        full_name: string,
        friendly_name: string,
        clientdb_instance?: string | null,
        address?: string | null,
        county?: string | null,
        country?: string | null,
        logo?: string | null,
        join_date?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        primary_contact?: string | null,
        contact_email?: string | null,
        contact_phone?: string | null,
        account_manager?: string | null,
        user?:  {
          __typename: "UserClientJoin",
          id: string,
          cognito_sub: string,
          client?:  {
            __typename: "Client",
            id: string,
            join_id: string,
            full_name: string,
            friendly_name: string,
            clientdb_instance?: string | null,
            address?: string | null,
            county?: string | null,
            country?: string | null,
            logo?: string | null,
            join_date?: string | null,
            archived?: boolean | null,
            archive_date?: string | null,
            primary_contact?: string | null,
            contact_email?: string | null,
            contact_phone?: string | null,
            account_manager?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateClientSubscription = {
  onUpdateClient?:  {
    __typename: "Client",
    id: string,
    join_id: string,
    full_name: string,
    friendly_name: string,
    clientdb_instance?: string | null,
    address?: string | null,
    county?: string | null,
    country?: string | null,
    logo?: string | null,
    join_date?: string | null,
    archived?: boolean | null,
    archive_date?: string | null,
    primary_contact?: string | null,
    contact_email?: string | null,
    contact_phone?: string | null,
    account_manager?: string | null,
    user?:  {
      __typename: "UserClientJoin",
      id: string,
      cognito_sub: string,
      client?:  {
        __typename: "Client",
        id: string,
        join_id: string,
        full_name: string,
        friendly_name: string,
        clientdb_instance?: string | null,
        address?: string | null,
        county?: string | null,
        country?: string | null,
        logo?: string | null,
        join_date?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        primary_contact?: string | null,
        contact_email?: string | null,
        contact_phone?: string | null,
        account_manager?: string | null,
        user?:  {
          __typename: "UserClientJoin",
          id: string,
          cognito_sub: string,
          client?:  {
            __typename: "Client",
            id: string,
            join_id: string,
            full_name: string,
            friendly_name: string,
            clientdb_instance?: string | null,
            address?: string | null,
            county?: string | null,
            country?: string | null,
            logo?: string | null,
            join_date?: string | null,
            archived?: boolean | null,
            archive_date?: string | null,
            primary_contact?: string | null,
            contact_email?: string | null,
            contact_phone?: string | null,
            account_manager?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteClientSubscription = {
  onDeleteClient?:  {
    __typename: "Client",
    id: string,
    join_id: string,
    full_name: string,
    friendly_name: string,
    clientdb_instance?: string | null,
    address?: string | null,
    county?: string | null,
    country?: string | null,
    logo?: string | null,
    join_date?: string | null,
    archived?: boolean | null,
    archive_date?: string | null,
    primary_contact?: string | null,
    contact_email?: string | null,
    contact_phone?: string | null,
    account_manager?: string | null,
    user?:  {
      __typename: "UserClientJoin",
      id: string,
      cognito_sub: string,
      client?:  {
        __typename: "Client",
        id: string,
        join_id: string,
        full_name: string,
        friendly_name: string,
        clientdb_instance?: string | null,
        address?: string | null,
        county?: string | null,
        country?: string | null,
        logo?: string | null,
        join_date?: string | null,
        archived?: boolean | null,
        archive_date?: string | null,
        primary_contact?: string | null,
        contact_email?: string | null,
        contact_phone?: string | null,
        account_manager?: string | null,
        user?:  {
          __typename: "UserClientJoin",
          id: string,
          cognito_sub: string,
          client?:  {
            __typename: "Client",
            id: string,
            join_id: string,
            full_name: string,
            friendly_name: string,
            clientdb_instance?: string | null,
            address?: string | null,
            county?: string | null,
            country?: string | null,
            logo?: string | null,
            join_date?: string | null,
            archived?: boolean | null,
            archive_date?: string | null,
            primary_contact?: string | null,
            contact_email?: string | null,
            contact_phone?: string | null,
            account_manager?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSettingSubscription = {
  onCreateSetting?:  {
    __typename: "Setting",
    id: string,
    setting: string,
    value?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSettingSubscription = {
  onUpdateSetting?:  {
    __typename: "Setting",
    id: string,
    setting: string,
    value?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSettingSubscription = {
  onDeleteSetting?:  {
    __typename: "Setting",
    id: string,
    setting: string,
    value?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
