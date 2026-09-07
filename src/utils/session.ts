import {API_ROUTES} from '@/constants';
import {
  addAccountFlowActions,
  authActions,
  authState$,
  getActiveTokens,
  type AuthTokens,
  type StoredAccount,
} from '@/store';
import {API, ApiEnvelope, readEnvelope} from '@/utils/api';
import {queryClient} from '@/utils/queryClient';

type ProfileMePayload = {
  id?: string;
  profile?: {
    username?: string | null;
    displayName?: string | null;
    avatar?: string | null;
  };
};

export async function completeSession(tokens: AuthTokens): Promise<StoredAccount> {
  const previousTokens = getActiveTokens();
  authActions.setSession(tokens);

  try {
    const response = await API.get<ApiEnvelope<ProfileMePayload>>(API_ROUTES.PROFILE.ME, {
      headers: {Authorization: `Bearer ${tokens.accessToken}`},
    });
    const data = readEnvelope<ProfileMePayload>(response.data);
    if (!data?.id) throw new Error('UNEXPECTED_PROFILE');

    const account: StoredAccount = {
      accountId: data.id,
      username: data.profile?.username?.trim() || data.id,
      displayName: data.profile?.displayName ?? null,
      avatar: data.profile?.avatar ?? null,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };

    authActions.upsertAccount(account);
    addAccountFlowActions.clear();
    queryClient.clear();
    return account;
  } catch (error) {
    if (previousTokens) {
      authActions.setSession(previousTokens);
    } else {
      authState$.assign({accessToken: null, refreshToken: null});
    }
    throw error;
  }
}
