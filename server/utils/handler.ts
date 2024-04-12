import type { EventHandler, EventHandlerRequest } from 'h3'

interface Response {
    isError: boolean;
}

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D>(
    handler: EventHandler<T, D>
): EventHandler<T, D> =>
    defineEventHandler<T>(async event => {
        try {
            const response = await handler(event) as Response;
            if (!(response && response.isError)) {
                return { response }
            } else {
                return response
            }
        } catch (err) {
            console.dir(err);
            event.res.statusCode = 500;
            return {
                code: "ERROR",
                message: "Something went wrong.",
            };
        }
    })