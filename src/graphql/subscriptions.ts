/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession {
    onCreateSession {
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
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession {
    onUpdateSession {
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
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession {
    onDeleteSession {
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
export const onCreatePresenter = /* GraphQL */ `
  subscription OnCreatePresenter {
    onCreatePresenter {
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
export const onUpdatePresenter = /* GraphQL */ `
  subscription OnUpdatePresenter {
    onUpdatePresenter {
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
export const onDeletePresenter = /* GraphQL */ `
  subscription OnDeletePresenter {
    onDeletePresenter {
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
export const onCreateTable = /* GraphQL */ `
  subscription OnCreateTable {
    onCreateTable {
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
export const onUpdateTable = /* GraphQL */ `
  subscription OnUpdateTable {
    onUpdateTable {
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
export const onDeleteTable = /* GraphQL */ `
  subscription OnDeleteTable {
    onDeleteTable {
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
export const onCreateHall = /* GraphQL */ `
  subscription OnCreateHall {
    onCreateHall {
      id
      hall_name
      hall_desc
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHall = /* GraphQL */ `
  subscription OnUpdateHall {
    onUpdateHall {
      id
      hall_name
      hall_desc
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHall = /* GraphQL */ `
  subscription OnDeleteHall {
    onDeleteHall {
      id
      hall_name
      hall_desc
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStage = /* GraphQL */ `
  subscription OnCreateStage {
    onCreateStage {
      id
      session_id
      stage_name
      stage_desc
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStage = /* GraphQL */ `
  subscription OnUpdateStage {
    onUpdateStage {
      id
      session_id
      stage_name
      stage_desc
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStage = /* GraphQL */ `
  subscription OnDeleteStage {
    onDeleteStage {
      id
      session_id
      stage_name
      stage_desc
      createdAt
      updatedAt
    }
  }
`;
export const onCreateWebinar = /* GraphQL */ `
  subscription OnCreateWebinar {
    onCreateWebinar {
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
export const onUpdateWebinar = /* GraphQL */ `
  subscription OnUpdateWebinar {
    onUpdateWebinar {
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
export const onDeleteWebinar = /* GraphQL */ `
  subscription OnDeleteWebinar {
    onDeleteWebinar {
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
export const onCreatePresenterSocialMedia = /* GraphQL */ `
  subscription OnCreatePresenterSocialMedia {
    onCreatePresenterSocialMedia {
      id
      presenter_id
      site
      link
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePresenterSocialMedia = /* GraphQL */ `
  subscription OnUpdatePresenterSocialMedia {
    onUpdatePresenterSocialMedia {
      id
      presenter_id
      site
      link
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePresenterSocialMedia = /* GraphQL */ `
  subscription OnDeletePresenterSocialMedia {
    onDeletePresenterSocialMedia {
      id
      presenter_id
      site
      link
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateUserEventGroup = /* GraphQL */ `
  subscription OnCreateUserEventGroup {
    onCreateUserEventGroup {
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
export const onUpdateUserEventGroup = /* GraphQL */ `
  subscription OnUpdateUserEventGroup {
    onUpdateUserEventGroup {
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
export const onDeleteUserEventGroup = /* GraphQL */ `
  subscription OnDeleteUserEventGroup {
    onDeleteUserEventGroup {
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
export const onCreateUserEventJoin = /* GraphQL */ `
  subscription OnCreateUserEventJoin {
    onCreateUserEventJoin {
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
export const onUpdateUserEventJoin = /* GraphQL */ `
  subscription OnUpdateUserEventJoin {
    onUpdateUserEventJoin {
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
export const onDeleteUserEventJoin = /* GraphQL */ `
  subscription OnDeleteUserEventJoin {
    onDeleteUserEventJoin {
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
export const onCreateTrueChatRoom = /* GraphQL */ `
  subscription OnCreateTrueChatRoom {
    onCreateTrueChatRoom {
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
export const onUpdateTrueChatRoom = /* GraphQL */ `
  subscription OnUpdateTrueChatRoom {
    onUpdateTrueChatRoom {
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
export const onDeleteTrueChatRoom = /* GraphQL */ `
  subscription OnDeleteTrueChatRoom {
    onDeleteTrueChatRoom {
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
export const onCreateTrueChatMessage = /* GraphQL */ `
  subscription OnCreateTrueChatMessage {
    onCreateTrueChatMessage {
      id
      cognito_sub
      room_id
      message
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTrueChatMessage = /* GraphQL */ `
  subscription OnUpdateTrueChatMessage {
    onUpdateTrueChatMessage {
      id
      cognito_sub
      room_id
      message
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTrueChatMessage = /* GraphQL */ `
  subscription OnDeleteTrueChatMessage {
    onDeleteTrueChatMessage {
      id
      cognito_sub
      room_id
      message
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFavourite = /* GraphQL */ `
  subscription OnCreateFavourite {
    onCreateFavourite {
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
export const onUpdateFavourite = /* GraphQL */ `
  subscription OnUpdateFavourite {
    onUpdateFavourite {
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
export const onDeleteFavourite = /* GraphQL */ `
  subscription OnDeleteFavourite {
    onDeleteFavourite {
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
export const onCreateUserClientJoin = /* GraphQL */ `
  subscription OnCreateUserClientJoin {
    onCreateUserClientJoin {
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
export const onUpdateUserClientJoin = /* GraphQL */ `
  subscription OnUpdateUserClientJoin {
    onUpdateUserClientJoin {
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
export const onDeleteUserClientJoin = /* GraphQL */ `
  subscription OnDeleteUserClientJoin {
    onDeleteUserClientJoin {
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
export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient {
    onCreateClient {
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
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient {
    onUpdateClient {
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
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient {
    onDeleteClient {
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
export const onCreateSetting = /* GraphQL */ `
  subscription OnCreateSetting {
    onCreateSetting {
      id
      setting
      value
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSetting = /* GraphQL */ `
  subscription OnUpdateSetting {
    onUpdateSetting {
      id
      setting
      value
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSetting = /* GraphQL */ `
  subscription OnDeleteSetting {
    onDeleteSetting {
      id
      setting
      value
      createdAt
      updatedAt
    }
  }
`;
