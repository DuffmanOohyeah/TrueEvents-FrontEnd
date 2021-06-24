/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createSession = /* GraphQL */ `
  mutation CreateSession(
    $input: CreateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    createSession(input: $input, condition: $condition) {
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
export const updateSession = /* GraphQL */ `
  mutation UpdateSession(
    $input: UpdateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    updateSession(input: $input, condition: $condition) {
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
export const deleteSession = /* GraphQL */ `
  mutation DeleteSession(
    $input: DeleteSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    deleteSession(input: $input, condition: $condition) {
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
export const createPresenter = /* GraphQL */ `
  mutation CreatePresenter(
    $input: CreatePresenterInput!
    $condition: ModelPresenterConditionInput
  ) {
    createPresenter(input: $input, condition: $condition) {
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
export const updatePresenter = /* GraphQL */ `
  mutation UpdatePresenter(
    $input: UpdatePresenterInput!
    $condition: ModelPresenterConditionInput
  ) {
    updatePresenter(input: $input, condition: $condition) {
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
export const deletePresenter = /* GraphQL */ `
  mutation DeletePresenter(
    $input: DeletePresenterInput!
    $condition: ModelPresenterConditionInput
  ) {
    deletePresenter(input: $input, condition: $condition) {
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
export const createTable = /* GraphQL */ `
  mutation CreateTable(
    $input: CreateTableInput!
    $condition: ModelTableConditionInput
  ) {
    createTable(input: $input, condition: $condition) {
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
export const updateTable = /* GraphQL */ `
  mutation UpdateTable(
    $input: UpdateTableInput!
    $condition: ModelTableConditionInput
  ) {
    updateTable(input: $input, condition: $condition) {
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
export const deleteTable = /* GraphQL */ `
  mutation DeleteTable(
    $input: DeleteTableInput!
    $condition: ModelTableConditionInput
  ) {
    deleteTable(input: $input, condition: $condition) {
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
export const createHall = /* GraphQL */ `
  mutation CreateHall(
    $input: CreateHallInput!
    $condition: ModelHallConditionInput
  ) {
    createHall(input: $input, condition: $condition) {
      id
      hall_name
      hall_desc
      createdAt
      updatedAt
    }
  }
`;
export const updateHall = /* GraphQL */ `
  mutation UpdateHall(
    $input: UpdateHallInput!
    $condition: ModelHallConditionInput
  ) {
    updateHall(input: $input, condition: $condition) {
      id
      hall_name
      hall_desc
      createdAt
      updatedAt
    }
  }
`;
export const deleteHall = /* GraphQL */ `
  mutation DeleteHall(
    $input: DeleteHallInput!
    $condition: ModelHallConditionInput
  ) {
    deleteHall(input: $input, condition: $condition) {
      id
      hall_name
      hall_desc
      createdAt
      updatedAt
    }
  }
`;
export const createStage = /* GraphQL */ `
  mutation CreateStage(
    $input: CreateStageInput!
    $condition: ModelStageConditionInput
  ) {
    createStage(input: $input, condition: $condition) {
      id
      session_id
      stage_name
      stage_desc
      createdAt
      updatedAt
    }
  }
`;
export const updateStage = /* GraphQL */ `
  mutation UpdateStage(
    $input: UpdateStageInput!
    $condition: ModelStageConditionInput
  ) {
    updateStage(input: $input, condition: $condition) {
      id
      session_id
      stage_name
      stage_desc
      createdAt
      updatedAt
    }
  }
`;
export const deleteStage = /* GraphQL */ `
  mutation DeleteStage(
    $input: DeleteStageInput!
    $condition: ModelStageConditionInput
  ) {
    deleteStage(input: $input, condition: $condition) {
      id
      session_id
      stage_name
      stage_desc
      createdAt
      updatedAt
    }
  }
`;
export const createWebinar = /* GraphQL */ `
  mutation CreateWebinar(
    $input: CreateWebinarInput!
    $condition: ModelWebinarConditionInput
  ) {
    createWebinar(input: $input, condition: $condition) {
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
export const updateWebinar = /* GraphQL */ `
  mutation UpdateWebinar(
    $input: UpdateWebinarInput!
    $condition: ModelWebinarConditionInput
  ) {
    updateWebinar(input: $input, condition: $condition) {
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
export const deleteWebinar = /* GraphQL */ `
  mutation DeleteWebinar(
    $input: DeleteWebinarInput!
    $condition: ModelWebinarConditionInput
  ) {
    deleteWebinar(input: $input, condition: $condition) {
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
export const createPresenterSocialMedia = /* GraphQL */ `
  mutation CreatePresenterSocialMedia(
    $input: CreatePresenterSocialMediaInput!
    $condition: ModelPresenterSocialMediaConditionInput
  ) {
    createPresenterSocialMedia(input: $input, condition: $condition) {
      id
      presenter_id
      site
      link
      createdAt
      updatedAt
    }
  }
`;
export const updatePresenterSocialMedia = /* GraphQL */ `
  mutation UpdatePresenterSocialMedia(
    $input: UpdatePresenterSocialMediaInput!
    $condition: ModelPresenterSocialMediaConditionInput
  ) {
    updatePresenterSocialMedia(input: $input, condition: $condition) {
      id
      presenter_id
      site
      link
      createdAt
      updatedAt
    }
  }
`;
export const deletePresenterSocialMedia = /* GraphQL */ `
  mutation DeletePresenterSocialMedia(
    $input: DeletePresenterSocialMediaInput!
    $condition: ModelPresenterSocialMediaConditionInput
  ) {
    deletePresenterSocialMedia(input: $input, condition: $condition) {
      id
      presenter_id
      site
      link
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createUserEventGroup = /* GraphQL */ `
  mutation CreateUserEventGroup(
    $input: CreateUserEventGroupInput!
    $condition: ModelUserEventGroupConditionInput
  ) {
    createUserEventGroup(input: $input, condition: $condition) {
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
export const updateUserEventGroup = /* GraphQL */ `
  mutation UpdateUserEventGroup(
    $input: UpdateUserEventGroupInput!
    $condition: ModelUserEventGroupConditionInput
  ) {
    updateUserEventGroup(input: $input, condition: $condition) {
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
export const deleteUserEventGroup = /* GraphQL */ `
  mutation DeleteUserEventGroup(
    $input: DeleteUserEventGroupInput!
    $condition: ModelUserEventGroupConditionInput
  ) {
    deleteUserEventGroup(input: $input, condition: $condition) {
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
export const createUserEventJoin = /* GraphQL */ `
  mutation CreateUserEventJoin(
    $input: CreateUserEventJoinInput!
    $condition: ModelUserEventJoinConditionInput
  ) {
    createUserEventJoin(input: $input, condition: $condition) {
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
export const updateUserEventJoin = /* GraphQL */ `
  mutation UpdateUserEventJoin(
    $input: UpdateUserEventJoinInput!
    $condition: ModelUserEventJoinConditionInput
  ) {
    updateUserEventJoin(input: $input, condition: $condition) {
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
export const deleteUserEventJoin = /* GraphQL */ `
  mutation DeleteUserEventJoin(
    $input: DeleteUserEventJoinInput!
    $condition: ModelUserEventJoinConditionInput
  ) {
    deleteUserEventJoin(input: $input, condition: $condition) {
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
export const createTrueChatRoom = /* GraphQL */ `
  mutation CreateTrueChatRoom(
    $input: CreateTrueChatRoomInput!
    $condition: ModelTrueChatRoomConditionInput
  ) {
    createTrueChatRoom(input: $input, condition: $condition) {
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
export const updateTrueChatRoom = /* GraphQL */ `
  mutation UpdateTrueChatRoom(
    $input: UpdateTrueChatRoomInput!
    $condition: ModelTrueChatRoomConditionInput
  ) {
    updateTrueChatRoom(input: $input, condition: $condition) {
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
export const deleteTrueChatRoom = /* GraphQL */ `
  mutation DeleteTrueChatRoom(
    $input: DeleteTrueChatRoomInput!
    $condition: ModelTrueChatRoomConditionInput
  ) {
    deleteTrueChatRoom(input: $input, condition: $condition) {
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
export const createTrueChatMessage = /* GraphQL */ `
  mutation CreateTrueChatMessage(
    $input: CreateTrueChatMessageInput!
    $condition: ModelTrueChatMessageConditionInput
  ) {
    createTrueChatMessage(input: $input, condition: $condition) {
      id
      cognito_sub
      room_id
      message
      createdAt
      updatedAt
    }
  }
`;
export const updateTrueChatMessage = /* GraphQL */ `
  mutation UpdateTrueChatMessage(
    $input: UpdateTrueChatMessageInput!
    $condition: ModelTrueChatMessageConditionInput
  ) {
    updateTrueChatMessage(input: $input, condition: $condition) {
      id
      cognito_sub
      room_id
      message
      createdAt
      updatedAt
    }
  }
`;
export const deleteTrueChatMessage = /* GraphQL */ `
  mutation DeleteTrueChatMessage(
    $input: DeleteTrueChatMessageInput!
    $condition: ModelTrueChatMessageConditionInput
  ) {
    deleteTrueChatMessage(input: $input, condition: $condition) {
      id
      cognito_sub
      room_id
      message
      createdAt
      updatedAt
    }
  }
`;
export const createFavourite = /* GraphQL */ `
  mutation CreateFavourite(
    $input: CreateFavouriteInput!
    $condition: ModelFavouriteConditionInput
  ) {
    createFavourite(input: $input, condition: $condition) {
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
export const updateFavourite = /* GraphQL */ `
  mutation UpdateFavourite(
    $input: UpdateFavouriteInput!
    $condition: ModelFavouriteConditionInput
  ) {
    updateFavourite(input: $input, condition: $condition) {
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
export const deleteFavourite = /* GraphQL */ `
  mutation DeleteFavourite(
    $input: DeleteFavouriteInput!
    $condition: ModelFavouriteConditionInput
  ) {
    deleteFavourite(input: $input, condition: $condition) {
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
export const createUserClientJoin = /* GraphQL */ `
  mutation CreateUserClientJoin(
    $input: CreateUserClientJoinInput!
    $condition: ModelUserClientJoinConditionInput
  ) {
    createUserClientJoin(input: $input, condition: $condition) {
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
export const updateUserClientJoin = /* GraphQL */ `
  mutation UpdateUserClientJoin(
    $input: UpdateUserClientJoinInput!
    $condition: ModelUserClientJoinConditionInput
  ) {
    updateUserClientJoin(input: $input, condition: $condition) {
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
export const deleteUserClientJoin = /* GraphQL */ `
  mutation DeleteUserClientJoin(
    $input: DeleteUserClientJoinInput!
    $condition: ModelUserClientJoinConditionInput
  ) {
    deleteUserClientJoin(input: $input, condition: $condition) {
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
export const createClient = /* GraphQL */ `
  mutation CreateClient(
    $input: CreateClientInput!
    $condition: ModelClientConditionInput
  ) {
    createClient(input: $input, condition: $condition) {
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
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
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
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
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
export const createSetting = /* GraphQL */ `
  mutation CreateSetting(
    $input: CreateSettingInput!
    $condition: ModelSettingConditionInput
  ) {
    createSetting(input: $input, condition: $condition) {
      id
      setting
      value
      createdAt
      updatedAt
    }
  }
`;
export const updateSetting = /* GraphQL */ `
  mutation UpdateSetting(
    $input: UpdateSettingInput!
    $condition: ModelSettingConditionInput
  ) {
    updateSetting(input: $input, condition: $condition) {
      id
      setting
      value
      createdAt
      updatedAt
    }
  }
`;
export const deleteSetting = /* GraphQL */ `
  mutation DeleteSetting(
    $input: DeleteSettingInput!
    $condition: ModelSettingConditionInput
  ) {
    deleteSetting(input: $input, condition: $condition) {
      id
      setting
      value
      createdAt
      updatedAt
    }
  }
`;
