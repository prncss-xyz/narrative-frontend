function add<T>(state: T[], value: T) {
  return [...state, value];
}

function remove<T>(state: T[], value: T) {
  return state.filter((value_) => value !== value_);
}

interface Item<T> {
  key: T;
  toElem: ({
    active,
    disabled,
    onClick,
  }: {
    active: boolean;
    disabled?: boolean;
    onClick: React.MouseEventHandler;
  }) => React.ReactNode;
}

export function TogglingSelector<T>({
  disabled,
  state,
  setState,
  items,
}: {
  state: T[];
  setState: (state: T[]) => void;
  disabled?: boolean;
  items: Item<T>[];
}) {
  return (
    <>
      {items.map(({ key, toElem }) => {
        const active = state.includes(key);
        return (
          <div key={String(key)}>
            {toElem({
              active,
              disabled,
              onClick: () =>
                setState(active ? remove(state, key) : add(state, key)),
            })}
          </div>
        );
      })}
    </>
  );
}
