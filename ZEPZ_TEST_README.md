# ZEPZ - Developer Test

# Tasks

- `[DONE]` It must compile without errors - if there are any potential
  compilation issues highlight them in your documentation.
- `[DONE]` When the app is launched, the user should be able to see a list of the top 20 StackOverflow users.
- `[DONE]` Each list item should contain user's profile image, name and reputation
- `[DONE]` If the server is unavailable (e.g. offline), the user should see a list of empty states with an error message.
- `[DONE]` Have cells be expandable (upon tapping the cell), with additional options to 'follow' and 'block' a user
- `[DONE]` Follow/block functionality should just be locally simulated, i.e. no actual API call should be made. The meaning of following and blocking is explained in the points below
- `[DONE]` Users that are followed should show an indicator in the main part of the list item
- `[PARTIAL]` Users that are blocked should show in a disabled greyed-out list item; tapping on the item should not open the details view _(I was not clear on this item - is my implementation missing a screen)_
- `[DONE]` Include the 'unfollow' option in the view when a user is followed
- `[PARTIAL]` Write unit tests wherever you see fit
  Emphasize testing and architecture
- `[DONE]` Written in either Javascript or Typescript (preferred)
- `[PARTIAL]` It should be designed such that the code can bridge to Native _(I was not clear on this item - code reuse in say React Native?)_
- `[DONE]` Explain in a few sentences the design decisions you took developing the above app, and describe anything that you were unable to do due to the time constraint

## Optional Bonus Points

- `[SKIPPED]` Generated JSDocument using your favourite documentation tool.
- `[DONE]` Add filtering / search input that filters the list of results from the API call.
- `[SKIPPED]` Implement a caching strategy.
- `[DONE]` Add paging

# Assessment Notes

## Design Decisions

- I chose to use the `MUI` Material UI library as it provides a robust set of baseline components for quickly getting started. Given the limited time available, it was more efficient to use existing components rather than creating custom styles from scratch.
- I prefer using "Atomic commits," which are commits that are as small and focused as possible. This approach allows for easier code reviews and maintains a logical progression of changes. Ideally, the application should remain in a working state between commits, unless explicitly stated otherwise. (see my commit history)
- I have organized the application by `feature`, which is my preferred approach. This allows for the possibility of splitting these features into independent modules in the future.
- I have used `index.ts` files to explicitly define the public `API` of features and modules. This approach forces developers to consider what the feature should do and how it will be consumed. It promotes writing smaller, isolated, and reusable code.
- The subscription **(follow/block)** logic is encapsulated in the `src/api/stackexchange/subscriptions` folder. In a _real-world_ application, this would likely be an API endpoint. I treated it as such to ensure proper separation of concerns. Additionally, there is a hook in `src/features/subscriptions/hooks/useSubscriptions.ts` that allows for subscribing to a list of users.
- I implemented `HTML entity character escaping` for the `user_name` field of a `User` object to correctly display characters with accents. This implementation can be found in `src/features/userslist/components/UserProfileCard/UserProfileCard.tsx`.
- The `<UserProfileCard>` component can and should be further broken down into smaller components for improved modularity and reusability.
- I was able to use the type definitions from `@userscripters/stackexchange-api-types`. They are out of date but still relevant to the types used in this application.
- The `<UsersListToolbar>`component uses a `debounce` function on the `onAction` event handler to prevent excessive updates. `<UsersListToolbar>` is a relatively simple controlled component, allowing the state to be fully externalized and manipulated within the parent without excessive callbacks or complex logic.
- Unfortunately, the testing coverage is insufficient.
  - There is a single, comprehensive test case provided in `src/features/userslist/components/UsersListToolbar/UsersListToolbar.test.tsx`.
  - I prefer **Cypress** as a robust modern approach to UI testing. Cypress
    powerful and simplifies teh testing of UI's with complex interactions.
  - Personally, I prefer using Cypress for robust and modern UI testing. Cypress simplifies the testing of UIs with complex interactions and provides powerful capabilities.
  - I strongly believe that tests should provide meaningful validations and that the effort put into creating and maintaining them should be proportional. Tests should adhere to the same standards as other code. It's important not to chase coverage unless it provides meaningful assurances.
  - End-to-end (E2E) testing is great for integration tests, critical paths, and complex user journeys.
  - Component/unit tests are inexpensive and highly recommended for most validations.
- The state logic in the `<UsersListPage>` component that deals with the request parameters would be best implemented in a separate hook using `useReducer`.
- I have configured some baseline `tsconfig` and `eslint` settings to ensure code consistency and readability. This is particularly important in larger projects that are shared among multiple developers.

## Time Breakdown

- Review: 15-30 mins
- Design: 30 mins
- Implementation: 6 hours
- Testing: 1 hour
- Documentation: 1 hour
