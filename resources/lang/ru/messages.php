<?php

return [
    'addkeys'                   => 'Добавить ключивые',
    'addkeys-placeholder'       => 'Добавляйте по одному ключу на строке без префикса группы',
    'addsuffixes'               => 'Набор Суффиксов',
    'addsuffixes-placeholder'   => 'добавляй каждый ключ с суффиксом строк, указанных здесь',
    'auto-fill'                 => 'Автозаполнение',
    'auto-fill-disabled'        => 'Заполнение...',
    'auto-translate'            => 'Авто Перевод',
    'auto-translate-disabled'   => 'Перевод...',
    'changed'                   => 'Измененны',
    'check-all'                 => '<i class="glyphicon glyphicon-ok"></i>',
    'check-none'                => '<i class="glyphicon glyphicon-remove"></i>',
    'choose-group'              => 'Выберите группу переводов',
    'choose-group-text'         => 'Выберите группу переводов для редакции. Если нет групп в списке, контактируйте вашего веб-админа.',
    'cleardstkeys'              => 'Стереть Ключи',
    'clearkeys'                 => 'Стереть Ключи',
    'clearsrckeys'              => 'Стереть Ключи',
    'clearsuffixes'             => 'Стереть Суфф.',
    'close'                     => 'Закрыть',
    'confirm-delete'            => <<<'TEXT'
Вы уверены, что хотите удалить переводы

:group

из базы данных? Любые изменения, которые не были опубликованы в файлы переводов будут потеряны.
TEXT
,
    'confirm-delete-all'        => <<<'TEXT'
Вы уверены, что хотите удалить все переводы из базы данных?

Любые изменения, которые не были опубликованы в файлы переводов будут потеряны.
TEXT
,
    'confirm-find'              => 'Вы уверены, что хотите сканировать папки приложения? Все найденные ключи перевода будут добавлены в базу данных.',
    'copykeys'                  => 'Скопируй',
    'db-connection'             => 'База данных',
    'delete'                    => 'Удалить',
    'delete-all'                => 'Удалить Все',
    'deleted'                   => 'Удаленные',
    'deletekeys'                => 'Удалить Ключи',
    'deleting'                  => 'Удаляю...',
    'display-locales'           => 'Рабочий Набор',
    'done-publishing'           => 'Сделал публикацию переводов для группы <strong>:group</strong>.',
    'done-publishing-all'       => 'Публикация переводов для <strong>всех</strong> групп завершена.',
    'dst-preview'               => 'На',
    'dstkey'                    => 'На',
    'dstkeys'                   => 'На Ключи',
    'dstkeys-placeholder'       => 'Добавляйте по одному ключу на строке с префиксом или без префикса группы',
    'enter-translation'         => 'Редактируйте перевод',
    'export-warning-text'       => 'Предупреждение, переводы не видны, пока они опубликованны вашем админом.',
    'find-in-files'             => 'Добавить Ссылки',
    'group'                     => 'Группа',
    'import-add'                => 'Только добавлять новые переводы',
    'import-all-done'           => 'Сделан импорт, обработанно <strong>:count</strong> переводов. Перезагрузите страницу, чтобы обновить группы.',
    'import-done-head'          => 'Сделал импорт, обработанно',
    'import-done-tail'          => 'переводов. Перезагрузите страницу, чтобы обновить группы.',
    'import-fresh'              => 'Удалить все, потом импортировать',
    'import-group'              => 'Импорт',
    'import-group-done'         => 'Сделан импорт группы <strong>:group</strong>, обработанно <strong>:count</strong> переводов. Перезагрузите страницу, чтобы обновить переводы.',
    'import-groups'             => 'Импорт все',
    'import-replace'            => 'Заменить существующие переводы',
    'in-place-edit'             => 'Редактирование на месте',
    'interface-locale'          => 'Интерфейс',
    'key'                       => 'Ключ',
    'keyop-count-mustmatch'     => 'Количество ключей для источника и получателя должны совпадать',
    'keyop-header'              => 'Результаты Ключевых Операций',
    'keyop-header-copy'         => 'Копирования ключей группы <strong>:group</strong>:',
    'keyop-header-delete'       => 'Удаления ключей в группе <strong>:group</strong>:',
    'keyop-header-move'         => 'Перемещения ключей в группе <strong>:group</strong>:',
    'keyop-header-preview'      => 'Пересмотр операции по ключам для группы <strong>:group</strong>:',
    'keyop-need-group'          => 'Ключевые операции требуют группу',
    'keyop-need-keys'           => 'Не указали ключей для операции',
    'keyop-wildcard-mustmatch'  => 'Подстановочный символ * должен быть первым или последним символом, и если они присутствуют, должны быть использованы на оба источника и в том же положении.',
    'keyop-wildcard-once'       => 'Подстановочный символ * может появиться в ключе только один раз.',
    'keyops-not-authorized'     => 'Ключевые операции не авторизованы на этом сервере. Обратитесь к веб-админу чтобы изменить этот параметр.',
    'keys'                      => 'Ключи',
    'loading'                   => 'Импорт...',
    'locale'                    => 'Язык',
    'mismatches'                => 'Не Совпадающие Переводы',
    'missing'                   => 'Отсутствует',
    'missmatched-quotes'        => 'несоответствующие или отсутствующие кавычки в строковом атрибуте :string',
    'movekeys'                  => 'Переместить Ключи',
    'preview'                   => 'Превью',
    'primary-locale'            => 'Первичная',
    'publish'                   => 'Опубликовать Группу',
    'publish-all'               => 'Опубликовать Все',
    'publishing'                => 'Публикую...',
    'reset-usage-info'          => 'Сброс Информации Об Использовании',
    'search'                    => 'Поиск',
    'search-done'               => 'Сделан поиск переводов, найдено <strong>:count</strong> переводов.',
    'search-done-head'          => 'Сделан поиск переводов, найдено',
    'search-done-tail'          => 'переводов.',
    'search-header'             => 'Найдено результатов: :count',
    'search-translations'       => 'Поиск Переводов',
    'searching'                 => 'Поиск...',
    'set-usage-info'            => 'Использование Набора Информации',
    'show-all'                  => 'Показывать Все',
    'show-changed'              => 'Показывать Изменненые',
    'show-deleted'              => 'Показывать Удаленные',
    'show-empty'                => 'Показывать Отсутствующие',
    'show-nonempty'             => 'Скрыть Отсутствующие',
    'show-usage-info'           => 'Показать Использование Информации',
    'src-preview'               => 'От',
    'srckey'                    => 'От',
    'srckeys'                   => 'От Ключей',
    'srckeys-placeholder'       => 'Добавляйте по одному ключу на строке с префиксом или без префикса группы',
    'stats'                     => 'Панель Мониторинга',
    'suffixed-keyops'           => 'Ключевых Операций с Суффиксами',
    'suffixes'                  => 'Суффиксы',
    'total'                     => 'В общем',
    'translating-locale'        => 'Перевод',
    'translation'               => 'Перевод',
    'translation-manager'       => 'Контроль Переводов',
    'translation-ops'           => 'Помощники Перевода',
    'translations'              => 'Переводы',
    'wildcard-keyops'           => 'Подстановочные Операции С Ключами',
    'zip-all'                   => 'Zip Все',
    'zip-group'                 => 'Zip Группу',
];
