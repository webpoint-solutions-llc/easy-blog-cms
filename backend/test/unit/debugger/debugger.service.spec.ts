import { Test } from '@nestjs/testing';
import { CommonModule } from '~/common/common.module';
import { DebuggerService } from '~/common/debugger/services/debugger.service';

describe('DebuggerService', () => {
    let debuggerService: DebuggerService;

    const sDescription = 'test description';
    const sClass = 'test class';
    const cFunction = 'test function';
    const data = { test: 'test' };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CommonModule],
        }).compile();

        debuggerService = moduleRef.get<DebuggerService>(DebuggerService);
    });

    it('should be defined', () => {
        expect(debuggerService).toBeDefined();
    });

    describe('info', () => {
        it('should be called', async () => {
            const test = jest.spyOn(debuggerService, 'info');

            debuggerService.info('DebuggerService', {
                description: sDescription,
                class: sClass,
                function: cFunction,
            });
            expect(test).toHaveBeenCalledWith('DebuggerService', {
                description: sDescription,
                class: sClass,
                function: cFunction,
            });
        });

        it('should be called with data', async () => {
            const test = jest.spyOn(debuggerService, 'info');

            debuggerService.info(
                'DebuggerService',
                {
                    description: sDescription,
                    class: sClass,
                    function: cFunction,
                },
                data
            );
            expect(test).toHaveBeenCalledWith(
                'DebuggerService',
                {
                    description: sDescription,
                    class: sClass,
                    function: cFunction,
                },
                data
            );
        });
    });

    describe('debug', () => {
        it('should be called', async () => {
            const test = jest.spyOn(debuggerService, 'debug');

            debuggerService.debug('DebuggerService', {
                description: sDescription,
                class: sClass,
                function: cFunction,
            });
            expect(test).toHaveBeenCalledWith('DebuggerService', {
                description: sDescription,
                class: sClass,
                function: cFunction,
            });
        });

        it('should be called with data', async () => {
            const test = jest.spyOn(debuggerService, 'debug');

            debuggerService.debug(
                'DebuggerService',
                {
                    description: sDescription,
                    class: sClass,
                    function: cFunction,
                },
                data
            );
            expect(test).toHaveBeenCalledWith(
                'DebuggerService',
                {
                    description: sDescription,
                    class: sClass,
                    function: cFunction,
                },
                data
            );
        });
    });

    describe('error', () => {
        it('should be called', async () => {
            const test = jest.spyOn(debuggerService, 'error');

            debuggerService.error('DebuggerService', {
                description: sDescription,
                class: sClass,
                function: cFunction,
            });
            expect(test).toHaveBeenCalledWith('DebuggerService', {
                description: sDescription,
                class: sClass,
                function: cFunction,
            });
        });

        it('should be called with data', async () => {
            const test = jest.spyOn(debuggerService, 'error');

            debuggerService.error(
                'DebuggerService',
                {
                    description: sDescription,
                    class: sClass,
                    function: cFunction,
                },
                data
            );
            expect(test).toHaveBeenCalledWith(
                'DebuggerService',
                {
                    description: sDescription,
                    class: sClass,
                    function: cFunction,
                },
                data
            );
        });
    });

    describe('warn', () => {
        it('should be called', async () => {
            const test = jest.spyOn(debuggerService, 'warn');

            debuggerService.warn('DebuggerService', {
                description: sDescription,
                class: sClass,
                function: cFunction,
            });
            expect(test).toHaveBeenCalledWith('DebuggerService', {
                description: sDescription,
                class: sClass,
                function: cFunction,
            });
        });

        it('should be called with data', async () => {
            const test = jest.spyOn(debuggerService, 'warn');

            debuggerService.warn(
                'DebuggerService',
                {
                    description: sDescription,
                    class: sClass,
                    function: cFunction,
                },
                data
            );
            expect(test).toHaveBeenCalledWith(
                'DebuggerService',
                {
                    description: sDescription,
                    class: sClass,
                    function: cFunction,
                },
                data
            );
        });
    });
});
