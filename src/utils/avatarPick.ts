/** Router query params mangle content:// and file URIs. Keep the picked photo in memory instead. */
let pendingAvatarUri: string | null = null;
let pendingAvatarPick = 0;

export function setPendingAvatarUri(uri: string) {
  pendingAvatarUri = uri;
  pendingAvatarPick += 1;
}

export function peekPendingAvatarPick() {
  return {uri: pendingAvatarUri ?? '', pick: pendingAvatarPick};
}
