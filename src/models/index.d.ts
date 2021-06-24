import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Event {
  readonly id: string;
  readonly client_id: string;
  readonly event_name: string;
  readonly event_logo?: string;
  readonly event_desc?: string;
  readonly start_date?: string;
  readonly end_date?: string;
  readonly timezone_abbr?: string;
  readonly primary_domain?: string;
  readonly other_domains?: (string | null)[];
  readonly address?: string;
  readonly city?: string;
  readonly county?: string;
  readonly country?: string;
  readonly archived?: boolean;
  readonly archive_date?: string;
  readonly sessions?: (Session | null)[];
  constructor(init: ModelInit<Event>);
  static copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}

export declare class Session {
  readonly id: string;
  readonly event_id: string;
  readonly session_name: string;
  readonly start_date?: string;
  readonly end_date?: string;
  readonly presenters?: (Presenter | null)[];
  readonly hall?: Hall;
  readonly stage?: Stage;
  constructor(init: ModelInit<Session>);
  static copyOf(source: Session, mutator: (draft: MutableModel<Session>) => MutableModel<Session> | void): Session;
}

export declare class Presenter {
  readonly id: string;
  readonly session_id: string;
  readonly title?: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly email?: string;
  readonly company?: string;
  readonly profile_img?: string;
  constructor(init: ModelInit<Presenter>);
  static copyOf(source: Presenter, mutator: (draft: MutableModel<Presenter>) => MutableModel<Presenter> | void): Presenter;
}

export declare class Hall {
  readonly id: string;
  readonly hall_name: string;
  constructor(init: ModelInit<Hall>);
  static copyOf(source: Hall, mutator: (draft: MutableModel<Hall>) => MutableModel<Hall> | void): Hall;
}

export declare class Stage {
  readonly id: string;
  readonly stage_name: string;
  constructor(init: ModelInit<Stage>);
  static copyOf(source: Stage, mutator: (draft: MutableModel<Stage>) => MutableModel<Stage> | void): Stage;
}

export declare class Table {
  readonly id: string;
  readonly table_name: string;
  readonly capacity?: number;
  constructor(init: ModelInit<Table>);
  static copyOf(source: Table, mutator: (draft: MutableModel<Table>) => MutableModel<Table> | void): Table;
}

export declare class PresenterSocialMedia {
  readonly id: string;
  readonly presenter?: Presenter;
  readonly site: string;
  readonly link?: string;
  constructor(init: ModelInit<PresenterSocialMedia>);
  static copyOf(source: PresenterSocialMedia, mutator: (draft: MutableModel<PresenterSocialMedia>) => MutableModel<PresenterSocialMedia> | void): PresenterSocialMedia;
}

export declare class User {
  readonly id: string;
  readonly cognito_sub: string;
  readonly title?: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly job_title?: string;
  readonly profile_img?: string;
  readonly ignore?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class UserEventGroup {
  readonly id: string;
  readonly name: string;
  readonly active?: boolean;
  readonly user?: UserEventJoin;
  constructor(init: ModelInit<UserEventGroup>);
  static copyOf(source: UserEventGroup, mutator: (draft: MutableModel<UserEventGroup>) => MutableModel<UserEventGroup> | void): UserEventGroup;
}

export declare class UserEventJoin {
  readonly id: string;
  readonly cognito_sub: string;
  readonly client_id: string;
  readonly event?: Event;
  readonly groups?: (UserEventGroup | null)[];
  constructor(init: ModelInit<UserEventJoin>);
  static copyOf(source: UserEventJoin, mutator: (draft: MutableModel<UserEventJoin>) => MutableModel<UserEventJoin> | void): UserEventJoin;
}

export declare class TrueChatRoom {
  readonly id: string;
  readonly room_name: string;
  readonly messages?: (TrueChatMessage | null)[];
  constructor(init: ModelInit<TrueChatRoom>);
  static copyOf(source: TrueChatRoom, mutator: (draft: MutableModel<TrueChatRoom>) => MutableModel<TrueChatRoom> | void): TrueChatRoom;
}

export declare class TrueChatMessage {
  readonly id: string;
  readonly cognito_sub: string;
  readonly room_id: string;
  readonly message: string;
  constructor(init: ModelInit<TrueChatMessage>);
  static copyOf(source: TrueChatMessage, mutator: (draft: MutableModel<TrueChatMessage>) => MutableModel<TrueChatMessage> | void): TrueChatMessage;
}

export declare class UserClientJoin {
  readonly id: string;
  readonly cognito_sub: string;
  readonly clients?: (Client | null)[];
  constructor(init: ModelInit<UserClientJoin>);
  static copyOf(source: UserClientJoin, mutator: (draft: MutableModel<UserClientJoin>) => MutableModel<UserClientJoin> | void): UserClientJoin;
}

export declare class Client {
  readonly id: string;
  readonly full_name: string;
  readonly friendly_name: string;
  readonly clientdb_instance?: string;
  readonly address?: string;
  readonly county?: string;
  readonly country?: string;
  readonly logo?: string;
  readonly join_date?: string;
  readonly archived?: boolean;
  readonly archive_date?: string;
  readonly primary_contact?: string;
  readonly contact_email?: string;
  readonly contact_phone?: string;
  readonly account_manager?: string;
  readonly user?: UserClientJoin;
  constructor(init: ModelInit<Client>);
  static copyOf(source: Client, mutator: (draft: MutableModel<Client>) => MutableModel<Client> | void): Client;
}

export declare class Setting {
  readonly id: string;
  readonly setting: string;
  readonly value?: string;
  constructor(init: ModelInit<Setting>);
  static copyOf(source: Setting, mutator: (draft: MutableModel<Setting>) => MutableModel<Setting> | void): Setting;
}