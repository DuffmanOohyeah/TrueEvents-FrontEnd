/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      client_id
      event_name
      event_logo
      event_desc
      start_date
      end_date
      timezone_abbr
      primary_domain
      other_domains
      address
      city
      county
      country
      archived
      archive_date
      sessions {
        items {
          id
          event_id
          session_name
          session_desc
          start_date
          end_date
          presenters {
            items {
              id
              session_id
              title
              first_name
              last_name
              email
              company
              profile_img
              createdAt
              updatedAt
            }
            nextToken
          }
          hall {
            id
            hall_name
            hall_desc
            createdAt
            updatedAt
          }
          stages {
            items {
              id
              session_id
              stage_name
              stage_desc
              createdAt
              updatedAt
            }
            nextToken
          }
          webinars {
            items {
              id
              session_id
              webinar_name
              webinar_desc
              webinar_type
              webinar_api_key
              webinar_url
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      tables {
        items {
          id
          event_id
          table_name
          capacity
          table_logo
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        client_id
        event_name
        event_logo
        event_desc
        start_date
        end_date
        timezone_abbr
        primary_domain
        other_domains
        address
        city
        county
        country
        archived
        archive_date
        sessions {
          items {
            id
            event_id
            session_name
            session_desc
            start_date
            end_date
            presenters {
              nextToken
            }
            hall {
              id
              hall_name
              hall_desc
              createdAt
              updatedAt
            }
            stages {
              nextToken
            }
            webinars {
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        tables {
          items {
            id
            event_id
            table_name
            capacity
            table_logo
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSession = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      event_id
      session_name
      session_desc
      start_date
      end_date
      presenters {
        items {
          id
          session_id
          title
          first_name
          last_name
          email
          company
          profile_img
          social_medias {
            items {
              id
              presenter_id
              site
              link
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      hall {
        id
        hall_name
        hall_desc
        createdAt
        updatedAt
      }
      stages {
        items {
          id
          session_id
          stage_name
          stage_desc
          createdAt
          updatedAt
        }
        nextToken
      }
      webinars {
        items {
          id
          session_id
          webinar_name
          webinar_desc
          webinar_type
          webinar_api_key
          webinar_url
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSessions = /* GraphQL */ `
  query ListSessions(
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        event_id
        session_name
        session_desc
        start_date
        end_date
        presenters {
          items {
            id
            session_id
            title
            first_name
            last_name
            email
            company
            profile_img
            social_medias {
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        hall {
          id
          hall_name
          hall_desc
          createdAt
          updatedAt
        }
        stages {
          items {
            id
            session_id
            stage_name
            stage_desc
            createdAt
            updatedAt
          }
          nextToken
        }
        webinars {
          items {
            id
            session_id
            webinar_name
            webinar_desc
            webinar_type
            webinar_api_key
            webinar_url
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPresenter = /* GraphQL */ `
  query GetPresenter($id: ID!) {
    getPresenter(id: $id) {
      id
      session_id
      title
      first_name
      last_name
      email
      company
      profile_img
      social_medias {
        items {
          id
          presenter_id
          site
          link
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPresenters = /* GraphQL */ `
  query ListPresenters(
    $filter: ModelPresenterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPresenters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        session_id
        title
        first_name
        last_name
        email
        company
        profile_img
        social_medias {
          items {
            id
            presenter_id
            site
            link
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTable = /* GraphQL */ `
  query GetTable($id: ID!) {
    getTable(id: $id) {
      id
      event_id
      table_name
      capacity
      table_logo
      createdAt
      updatedAt
    }
  }
`;
export const listTables = /* GraphQL */ `
  query ListTables(
    $filter: ModelTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        event_id
        table_name
        capacity
        table_logo
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHall = /* GraphQL */ `
  query GetHall($id: ID!) {
    getHall(id: $id) {
      id
      hall_name
      hall_desc
      createdAt
      updatedAt
    }
  }
`;
export const listHalls = /* GraphQL */ `
  query ListHalls(
    $filter: ModelHallFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHalls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        hall_name
        hall_desc
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStage = /* GraphQL */ `
  query GetStage($id: ID!) {
    getStage(id: $id) {
      id
      session_id
      stage_name
      stage_desc
      createdAt
      updatedAt
    }
  }
`;
export const listStages = /* GraphQL */ `
  query ListStages(
    $filter: ModelStageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        session_id
        stage_name
        stage_desc
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWebinar = /* GraphQL */ `
  query GetWebinar($id: ID!) {
    getWebinar(id: $id) {
      id
      session_id
      webinar_name
      webinar_desc
      webinar_type
      webinar_api_key
      webinar_url
      createdAt
      updatedAt
    }
  }
`;
export const listWebinars = /* GraphQL */ `
  query ListWebinars(
    $filter: ModelWebinarFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWebinars(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        session_id
        webinar_name
        webinar_desc
        webinar_type
        webinar_api_key
        webinar_url
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPresenterSocialMedia = /* GraphQL */ `
  query GetPresenterSocialMedia($id: ID!) {
    getPresenterSocialMedia(id: $id) {
      id
      presenter_id
      site
      link
      createdAt
      updatedAt
    }
  }
`;
export const listPresenterSocialMedias = /* GraphQL */ `
  query ListPresenterSocialMedias(
    $filter: ModelPresenterSocialMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPresenterSocialMedias(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        presenter_id
        site
        link
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      cognito_sub
      title
      first_name
      last_name
      job_title
      profile_img
      ignore
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cognito_sub
        title
        first_name
        last_name
        job_title
        profile_img
        ignore
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserEventGroup = /* GraphQL */ `
  query GetUserEventGroup($id: ID!) {
    getUserEventGroup(id: $id) {
      id
      join_id
      name
      active
      user {
        id
        cognito_sub
        client_id
        event {
          id
          client_id
          event_name
          event_logo
          event_desc
          start_date
          end_date
          timezone_abbr
          primary_domain
          other_domains
          address
          city
          county
          country
          archived
          archive_date
          sessions {
            items {
              id
              event_id
              session_name
              session_desc
              start_date
              end_date
              createdAt
              updatedAt
            }
            nextToken
          }
          tables {
            items {
              id
              event_id
              table_name
              capacity
              table_logo
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        groups {
          items {
            id
            join_id
            name
            active
            user {
              id
              cognito_sub
              client_id
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserEventGroups = /* GraphQL */ `
  query ListUserEventGroups(
    $filter: ModelUserEventGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserEventGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        join_id
        name
        active
        user {
          id
          cognito_sub
          client_id
          event {
            id
            client_id
            event_name
            event_logo
            event_desc
            start_date
            end_date
            timezone_abbr
            primary_domain
            other_domains
            address
            city
            county
            country
            archived
            archive_date
            sessions {
              nextToken
            }
            tables {
              nextToken
            }
            createdAt
            updatedAt
          }
          groups {
            items {
              id
              join_id
              name
              active
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserEventJoin = /* GraphQL */ `
  query GetUserEventJoin($id: ID!) {
    getUserEventJoin(id: $id) {
      id
      cognito_sub
      client_id
      event {
        id
        client_id
        event_name
        event_logo
        event_desc
        start_date
        end_date
        timezone_abbr
        primary_domain
        other_domains
        address
        city
        county
        country
        archived
        archive_date
        sessions {
          items {
            id
            event_id
            session_name
            session_desc
            start_date
            end_date
            presenters {
              nextToken
            }
            hall {
              id
              hall_name
              hall_desc
              createdAt
              updatedAt
            }
            stages {
              nextToken
            }
            webinars {
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        tables {
          items {
            id
            event_id
            table_name
            capacity
            table_logo
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      groups {
        items {
          id
          join_id
          name
          active
          user {
            id
            cognito_sub
            client_id
            event {
              id
              client_id
              event_name
              event_logo
              event_desc
              start_date
              end_date
              timezone_abbr
              primary_domain
              other_domains
              address
              city
              county
              country
              archived
              archive_date
              createdAt
              updatedAt
            }
            groups {
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserEventJoins = /* GraphQL */ `
  query ListUserEventJoins(
    $filter: ModelUserEventJoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserEventJoins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cognito_sub
        client_id
        event {
          id
          client_id
          event_name
          event_logo
          event_desc
          start_date
          end_date
          timezone_abbr
          primary_domain
          other_domains
          address
          city
          county
          country
          archived
          archive_date
          sessions {
            items {
              id
              event_id
              session_name
              session_desc
              start_date
              end_date
              createdAt
              updatedAt
            }
            nextToken
          }
          tables {
            items {
              id
              event_id
              table_name
              capacity
              table_logo
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        groups {
          items {
            id
            join_id
            name
            active
            user {
              id
              cognito_sub
              client_id
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTrueChatRoom = /* GraphQL */ `
  query GetTrueChatRoom($id: ID!) {
    getTrueChatRoom(id: $id) {
      id
      room_name
      messages {
        items {
          id
          cognito_sub
          room_id
          message
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTrueChatRooms = /* GraphQL */ `
  query ListTrueChatRooms(
    $filter: ModelTrueChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrueChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        room_name
        messages {
          items {
            id
            cognito_sub
            room_id
            message
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTrueChatMessage = /* GraphQL */ `
  query GetTrueChatMessage($id: ID!) {
    getTrueChatMessage(id: $id) {
      id
      cognito_sub
      room_id
      message
      createdAt
      updatedAt
    }
  }
`;
export const listTrueChatMessages = /* GraphQL */ `
  query ListTrueChatMessages(
    $filter: ModelTrueChatMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrueChatMessages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        cognito_sub
        room_id
        message
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFavourite = /* GraphQL */ `
  query GetFavourite($id: ID!) {
    getFavourite(id: $id) {
      id
      cognito_sub
      client_id
      event_id
      session_id
      presenter_id
      attendee_cognito_sub
      createdAt
      updatedAt
    }
  }
`;
export const listFavourites = /* GraphQL */ `
  query ListFavourites(
    $filter: ModelFavouriteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavourites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cognito_sub
        client_id
        event_id
        session_id
        presenter_id
        attendee_cognito_sub
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserClientJoin = /* GraphQL */ `
  query GetUserClientJoin($id: ID!) {
    getUserClientJoin(id: $id) {
      id
      cognito_sub
      client {
        id
        join_id
        full_name
        friendly_name
        clientdb_instance
        address
        county
        country
        logo
        join_date
        archived
        archive_date
        primary_contact
        contact_email
        contact_phone
        account_manager
        user {
          id
          cognito_sub
          client {
            id
            join_id
            full_name
            friendly_name
            clientdb_instance
            address
            county
            country
            logo
            join_date
            archived
            archive_date
            primary_contact
            contact_email
            contact_phone
            account_manager
            user {
              id
              cognito_sub
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserClientJoins = /* GraphQL */ `
  query ListUserClientJoins(
    $filter: ModelUserClientJoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserClientJoins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cognito_sub
        client {
          id
          join_id
          full_name
          friendly_name
          clientdb_instance
          address
          county
          country
          logo
          join_date
          archived
          archive_date
          primary_contact
          contact_email
          contact_phone
          account_manager
          user {
            id
            cognito_sub
            client {
              id
              join_id
              full_name
              friendly_name
              clientdb_instance
              address
              county
              country
              logo
              join_date
              archived
              archive_date
              primary_contact
              contact_email
              contact_phone
              account_manager
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getClient = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      join_id
      full_name
      friendly_name
      clientdb_instance
      address
      county
      country
      logo
      join_date
      archived
      archive_date
      primary_contact
      contact_email
      contact_phone
      account_manager
      user {
        id
        cognito_sub
        client {
          id
          join_id
          full_name
          friendly_name
          clientdb_instance
          address
          county
          country
          logo
          join_date
          archived
          archive_date
          primary_contact
          contact_email
          contact_phone
          account_manager
          user {
            id
            cognito_sub
            client {
              id
              join_id
              full_name
              friendly_name
              clientdb_instance
              address
              county
              country
              logo
              join_date
              archived
              archive_date
              primary_contact
              contact_email
              contact_phone
              account_manager
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listClients = /* GraphQL */ `
  query ListClients(
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        join_id
        full_name
        friendly_name
        clientdb_instance
        address
        county
        country
        logo
        join_date
        archived
        archive_date
        primary_contact
        contact_email
        contact_phone
        account_manager
        user {
          id
          cognito_sub
          client {
            id
            join_id
            full_name
            friendly_name
            clientdb_instance
            address
            county
            country
            logo
            join_date
            archived
            archive_date
            primary_contact
            contact_email
            contact_phone
            account_manager
            user {
              id
              cognito_sub
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSetting = /* GraphQL */ `
  query GetSetting($id: ID!) {
    getSetting(id: $id) {
      id
      setting
      value
      createdAt
      updatedAt
    }
  }
`;
export const listSettings = /* GraphQL */ `
  query ListSettings(
    $filter: ModelSettingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        setting
        value
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
